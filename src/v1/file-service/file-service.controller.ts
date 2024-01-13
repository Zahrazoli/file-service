import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import AuthenticateGuard from '../../component/guards/authenticate.guard';
import { FileServiceService } from './file-service.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/v1.0/files')
export class FileServiceController {
  constructor(private fileService: FileServiceService) {}
  @Get('/')
  @UseGuards(AuthenticateGuard)
  @Render('panel/files')
  async getUserFilesView(@Req() req: Request) {}

  @Get('/list')
  @UseGuards(AuthenticateGuard)
  async getUserFilesList(@Req() req: Request, @Res() res: Response) {
    const { draw, start, length } = req.query;
    const userId = req.session.userId;
    const result = await this.fileService.getUserFilesList(
      userId,
      +start,
      +length,
    );
    res.send({
      draw: +draw,
      recordsTotal: result.totalDocs,
      recordsFiltered: result.totalDocs,
      data: result.docs.map((item) => {
        const sizeInMB = (item.size / (1024 * 1024)).toFixed(2);
        return [
          item.name,
          `${sizeInMB} MB`,
          item.downloadCount,
          item.createdAt,
          `<i class="fa fa-copy pointer" onclick="navigator.clipboard.writeText(window.location.origin + '/v1.0/files/${item._id}').then(()=>{alert('لینک دانلود کپی شد')});"></i>`,
          `<i class="fa fa-download pointer" onclick="window.location='/v1.0/files/${item._id}'"></i>`,
          `<i class="fa fa-remove pointer" onclick="window.location='/v1.0/files/delete/${item._id}' "></i>`,
        ];
      }),
    });
  }

  @Post('/')
  @UseGuards(AuthenticateGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @UploadedFile()
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      if (!file) throw new BadRequestException('لطفا فایل خود را انتخاب کنید');
      const userId = req.user._id;
      const { size, buffer, originalname: name, mimetype } = file;
      await this.fileService.validateFileSize(userId, size);
      await this.fileService.upload({
        size,
        name,
        userId,
        buffer,
        mimeType: mimetype,
      });
      res.redirect('/v1.0/files');
    } catch (e) {
      console.log(e);
      const errors = Array.isArray(e.response.message)
        ? e.response.message
        : [e.response.message];
      return res.render('panel/files', { errors: errors });
    }
  }

  @Get('/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const downloadResult = await this.fileService.dowload(id);
    res.contentType(downloadResult.fileInfo.mimeType);
    res.attachment(downloadResult.fileInfo.name);
    downloadResult.stream.pipe(res);
  }

  @Get('/delete/:id')
  @UseGuards(AuthenticateGuard)
  async deleteFile(
    @Param('id') fileId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userId = req.user._id;
    await this.fileService.delete(fileId, userId);
    res.redirect('/v1.0/files');
  }
}
