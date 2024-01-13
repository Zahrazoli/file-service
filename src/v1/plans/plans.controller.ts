import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import AuthenticateGuard from '../../component/guards/authenticate.guard';
import { Request, Response } from 'express';
import { PlansService } from './plans.service';
import { CreatePlanDTO } from './plan.dto';
import { validateBody } from '../../utils';

@Controller('v1.0/plans')
export class PlansController {
  constructor(private readonly planService: PlansService) {}

  @Render('panel/plans')
  @UseGuards(AuthenticateGuard)
  @Get('/')
  showPlansIndex() {}

  @UseGuards(AuthenticateGuard)
  @Post('/')
  async createPlan(@Body() body: CreatePlanDTO, @Res() res: Response) {
    try {
      await validateBody(body, CreatePlanDTO);
      await this.planService.create(body);
      res.redirect('/v1.0/plans');
    } catch (e) {
      const errors = Array.isArray(e.response.message)
        ? e.response.message
        : [e.response.message];
      res.render('panel/plans', { errors });
    }
  }

  @UseGuards(AuthenticateGuard)
  @Get('/list')
  async plansList(@Req() req: Request, @Res() res: Response) {
    const { draw, start, length } = req.query;
    const plans = await this.planService.getPlansList(
      req.session.userId,
      +start,
      +length,
    );
    const output = {
      draw: +draw,
      recordsTotal: plans.totalDocs,
      recordsFiltered: plans.totalDocs,
      data: plans.docs.map((item) => {
        const row = [
          item.name,
          `${item.size} بایت`,
          `${item.duration} روز`,
          `${item.price} تومان`,
          item.purchased
            ? 'خریداری شده'
            : `<button class="btn btn-primary" onClick="window.location='/v1.0/plans/purchase/${item._id}'">خرید</button>`,
        ];
        if (req.user.isAdmin) {
          row.push(
            `<button class="btn btn-warning" onClick="window.location='/v1.0/plans/edit/${item._id}'">ویرایش</button>`,
          );
        }
        return row;
      }),
    };
    res.send(output);
  }

  @UseGuards(AuthenticateGuard)
  @Get('/purchase/:id')
  async purchasePlan(
    @Param('id') planId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { redirectUrl } = await this.planService.purchase(
        planId,
        req.session.userId,
      );
      res.redirect(redirectUrl);
    } catch (e) {
      const errors = Array.isArray(e.response.message)
        ? e.response.message
        : [e.response.message];
      res.render('panel/plans', { OrderErrors: errors });
    }
  }
}
