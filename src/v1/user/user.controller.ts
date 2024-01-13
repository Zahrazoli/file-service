import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDTO, SignupDTO, UserCreateDTO, UserUpdateDTO } from './user.dto';
import { Request, Response } from 'express';
import AuthenticateGuard from '../../component/guards/authenticate.guard';
import { validateBody } from '../../utils';
import { FileServiceService } from '../file-service/file-service.service';

@Controller({ path: '/v1.0/user' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileServiceService,
  ) {}

  @Post('/login')
  async login(
    @Body() body: LoginDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await validateBody(body, LoginDTO);
      const { email, password } = body;
      const user = await this.userService.login(email, password);
      req.session.userId = user._id;
      req.session.access = user.scope;
      req.session.username = user.email;
      req.session.isLoggedIn = true;
      res.redirect('/v1.0/dashboard');
    } catch (e) {
      const errors = Array.isArray(e.response.message)
        ? e.response.message
        : [e.response.message];
      res.render('others/index', { errors, login: true });
    }
  }
  @Post('/signup')
  async signup(
    @Body() body: SignupDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await validateBody(body, SignupDTO);
      const { email, confirmPassword, password } = body;
      const user = await this.userService.signup(
        email,
        password,
        confirmPassword,
      );
      req.session.userId = user._id;
      req.session.access = user.scope;
      req.session.username = user.email;
      req.session.isLoggedIn = true;
      res.redirect('/v1.0/dashboard');
    } catch (e) {
      const errors = Array.isArray(e.response.message)
        ? e.response.message
        : [e.response.message];
      return res.render('others/index', {
        errors,
        signup: true,
      });
    }
  }

  @Get('/profile')
  @UseGuards(AuthenticateGuard)
  @Render('panel/profile')
  async getProfileView(@Req() req: Request) {
    return {
      filesCount: await this.fileService.getUserFilesCount(req.session.userId),
      totalStorage: await this.fileService.getTotalStorage(req.session.userId),
      usedStorage: await this.fileService.getUsedStorage(req.session.userId),
    };
  }

  @Post('/update')
  @UseGuards(AuthenticateGuard)
  async update(
    @Body() body: UserUpdateDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await validateBody(body, UserUpdateDTO);
      await this.userService.updateUserById(req.session.userId, body);
    } catch (e) {
      const errors = Array.isArray(e.response.message)
        ? e.response.message
        : [e.response.message];
      return res.render('panel/profile', { errors, info: req.body });
    }
    res.redirect('/v1.0/user/profile');
  }

  @Post('/create')
  @UseGuards(AuthenticateGuard)
  async create(
    @Body() body: UserCreateDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      if (!req.user.isAdmin) {
        throw new UnauthorizedException('دسترسی مجاز نمیباشد');
      }
      await validateBody(body, UserCreateDTO);
      await this.userService.create(req.session.userId, body);
    } catch (e) {
      const errors = Array.isArray(e.response.message)
        ? e.response.message
        : [e.response.message];
      return res.render('panel/profile', {
        createUserErrors: errors,
        info: req.body,
      });
    }
    res.redirect('/v1.0/user/profile');
  }

  @Get('/logout')
  @Redirect('/')
  logout(@Req() req: Request) {
    (req.session as any).destroy();
  }
}
