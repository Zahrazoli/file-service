import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderModel, OrderStatusTypes } from '../../models/order.model';
import { HttpService } from '@nestjs/axios';
import { StatusTypes, UsersPlanModel } from '../../models/usersPlan.model';
import * as moment from 'moment/moment';
import { ServicePlansModel } from '../../models/servicePlans.model';

@Injectable()
export class PaymentService {
  @InjectModel(OrderModel.name) private readonly orderRepo: Model<OrderModel>;
  @InjectModel(ServicePlansModel.name)
  private readonly plansRepo: Model<ServicePlansModel>;
  @InjectModel(UsersPlanModel.name)
  private readonly userPlansRepo: Model<UsersPlanModel>;

  constructor(private readonly ipg: HttpService) {}
  async requestOrder(orderDetails: {
    amount: number;
    userId: string | Types.ObjectId;
    planId: string | Types.ObjectId;
  }) {
    const { amount, userId, planId } = orderDetails;
    const order = await this.orderRepo.create({
      planId: new Types.ObjectId(planId),
      userId: new Types.ObjectId(userId),
      amount,
    });
    const requestOrderResult = await this.ipg
      .post('/request', {
        merchant: 'zibal',
        callbackUrl: 'https://' + 'zolfagharifar.liara.run/bank/callback',
        amount,
      })
      .toPromise();
    order.bankToken = order.RRN = requestOrderResult.data.trackId;
    await order.save();
    return {
      orderId: order._id,
      redirectUrl: `https://gateway.zibal.ir/start/${requestOrderResult.data.trackId}`,
    };
  }

  async confirm(trackId: string) {
    const order = await this.orderRepo.findOne({ bankToken: trackId });
    if (!order) {
      throw new NotFoundException('تراکنش مورد نظر یافت نشد');
    }
    const verifyResult = await this.ipg
      .post('/verify', { merchant: 'zibal', trackId })
      .toPromise();
    if (verifyResult.data.status == 1) {
      order.status = OrderStatusTypes.Confirm;
      order.RRN = trackId;
      await order.save();
    }
    return order;
  }

  async inquiry(trackId: string) {
    const result = await this.ipg
      .post('/inquiry', {
        merchant: 'zibal',
        trackId,
      })
      .toPromise();
    return result.data;
  }

  async handleCallback(trackId: string, success: string) {
    if (success == '0') {
      await this.orderRepo.findOneAndUpdate(
        { bankToken: trackId },
        { status: OrderStatusTypes.Failed },
      );
      throw new PreconditionFailedException(
        'پرداخت شما موفقیت آمیز نبود. در صورت کسر وجه از حساب شما مبلغ طی ۷۲ ساعت آینده بازخواهد گشت.',
      );
    }
    const orderInfo = await this.confirm(trackId);
    const { planId, userId } = orderInfo;
    const plan = await this.plansRepo.findById(planId);
    await this.userPlansRepo.create({
      planId,
      userId,
      status: StatusTypes.Active,
      expiredAt: moment().add(plan.duration, 'day'),
    });
    return {
      status: orderInfo.status,
      name: plan.name,
      price: plan.price,
      paymentDate: orderInfo.updatedAt,
      RRN: orderInfo.RRN,
    };
  }

  async getOrderDetails(trackId: string) {
    return this.orderRepo.findOne(
      { bankToken: trackId },
      {},
      { populate: { path: 'planId', select: 'name' } },
    );
  }
}
