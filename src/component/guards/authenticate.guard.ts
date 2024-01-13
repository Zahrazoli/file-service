import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import UnAuthenticatedException from '../exceptions/UnAuthenticated.exception';
import { Model, Types } from 'mongoose';
import { UserDocument, UserModel } from '../../models/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export default class AuthenticateGuard implements CanActivate {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    if (!req.session.isLoggedIn) {
      throw new UnAuthenticatedException();
    } else {
      const user = await this.userModel.findById(req.session.userId);
      req.user = user;
      res.locals.session = req.session;
      res.locals.user = user;
      return true;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user: UserDocument;
      session: {
        userId: Types.ObjectId;
        access: string[];
        username: string;
        isLoggedIn: boolean;
      };
    }
  }
}
