import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import AuthenticateGuard from '../../component/guards/authenticate.guard';
import { FileServiceService } from '../file-service/file-service.service';
import { Request } from 'express';

@Controller('v1.0/dashboard')
export class DashboardController {
  constructor(private readonly fileService: FileServiceService) {}
  @Render('panel/dashboard')
  @UseGuards(AuthenticateGuard)
  @Get('/')
  async showDashboard(@Req() req: Request) {
    return {
      filesCount: await this.fileService.getUserFilesCount(req.session.userId),
      totalStorage: await this.fileService.getTotalStorage(req.session.userId),
      usedStorage: await this.fileService.getUsedStorage(req.session.userId),
    };
  }
}
