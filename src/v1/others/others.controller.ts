import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import IsLoggedInGuard from '../../component/guards/isLoggedIn.guard';

@Controller('/')
export class OthersController {
  @Get('')
  @UseGuards(IsLoggedInGuard)
  @Render('others/index')
  getIndexPage() {}
}
