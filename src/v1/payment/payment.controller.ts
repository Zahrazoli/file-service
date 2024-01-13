import { Controller, Get, Query, Res } from '@nestjs/common';
import { CallBackDTO } from './payment.dto';
import { PaymentService } from './payment.service';
import { Response } from 'express';
import { ServicePlansDocument } from '../../models/servicePlans.model';

@Controller('/bank')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Get('/callback')
  async callback(@Query() body: CallBackDTO, @Res() res: Response) {
    let errors: any;
    const { success, trackId, status } = body;
    try {
      await this.paymentService.handleCallback(trackId, success);
    } catch (e) {
      errors = Array.isArray(e.response.message)
        ? e.response.message
        : [e.response.message];
    }
    const orderDetails = await this.paymentService.getOrderDetails(trackId);
    return res.render('panel/receipt', {
      status: orderDetails.status,
      name: (orderDetails.planId as unknown as ServicePlansDocument).name,
      price: orderDetails.amount,
      RRN: orderDetails.RRN,
      paymentDate: orderDetails.updatedAt,
      errors,
    });
  }
}
