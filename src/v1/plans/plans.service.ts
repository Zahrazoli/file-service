import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, PaginateModel, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  ServicePlansModel,
  ServicesTypes,
} from '../../models/servicePlans.model';
import {
  StatusTypes,
  StatusTypes as UsersPlanStatusTypes,
  UsersPlanModel,
} from '../../models/usersPlan.model';
import { CreatePlanDTO } from './plan.dto';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class PlansService {
  constructor(private readonly ipgService: PaymentService) {}

  @InjectModel(ServicePlansModel.name)
  private readonly plansRepo: PaginateModel<ServicePlansModel>;

  @InjectModel(UsersPlanModel.name)
  private readonly userPlansRepo: Model<UsersPlanModel>;

  async getPlansList(
    userId: string | Types.ObjectId,
    offset: number = 0,
    limit: number = 10,
  ) {
    const plans = await this.plansRepo.paginate(
      {
        type: { $nin: [ServicesTypes.Free, ServicesTypes.Starter] },
        status: StatusTypes.Active,
      },
      { offset, limit },
    );

    const userPlans = (
      await this.userPlansRepo.find({
        status: UsersPlanStatusTypes.Active,
        userId: new Types.ObjectId(userId),
      })
    ).filter((plan) => {
      if (new Date().getTime() > new Date(plan.expiredAt).getTime()) {
        plan.status = StatusTypes.Expired;
        plan.save();
      } else {
        return plan;
      }
    });

    return {
      totalDocs: plans.totalDocs,
      docs: plans.docs.map((plan) => {
        return {
          ...plan.toJSON(),
          purchased: userPlans
            .map((item) => item.planId.toString())
            .includes(plan._id.toString()),
        };
      }),
    };
  }

  async create(data: CreatePlanDTO) {
    const { size, type, name, duration, price } = data;
    const plan = await this.plansRepo.findOne({ size, duration, price });
    if (plan) {
      throw new ConflictException('اشتراک با این مشخصات موجود است.');
    }
    await this.plansRepo.create({ name, duration, price, size, type });
  }

  async purchase(planId: string, userId: string | Types.ObjectId) {
    const userPlan = await this.userPlansRepo.findOne({
      userId,
      planId,
      expiredAt: { $gt: new Date() },
    });
    if (userPlan)
      throw new ConflictException('اشتراک مورد برای شما فعال میباشد.');
    const plan = await this.plansRepo.findOne({
      _id: planId,
      status: StatusTypes.Active,
    });
    if (!plan) throw new NotFoundException('اشتراک مورد نظر یافت نشد.');
    const order = await this.ipgService.requestOrder({
      planId,
      userId,
      amount: plan.price,
    });
    return order;
  }
}
