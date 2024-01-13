import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserModel } from '../../models/user.model';
import * as bcrypt from 'bcrypt';
import {
  ServicePlansModel,
  ServicesTypes,
  StatusTypes,
} from '../../models/servicePlans.model';
import { UsersPlanModel } from '../../models/usersPlan.model';
import { UserCreateDTO } from './user.dto';
import * as moment from 'moment';

@Injectable()
export class UserService {
  @InjectModel(UserModel.name) private readonly userRepo: Model<UserModel>;
  @InjectModel(UsersPlanModel.name)
  private readonly userPlansRepo: Model<UsersPlanModel>;
  @InjectModel(ServicePlansModel.name)
  private readonly plansRepo: Model<ServicePlansModel>;
  async signup(email: string, password: string, confirmPassword: string) {
    const isUserExist = await this.userRepo.findOne({ email });
    if (isUserExist) {
      throw new ConflictException('کاربری با این نام قبلا ثبت شده است.');
    }
    if (password != confirmPassword) {
      throw new BadRequestException('رمزعبور یکسان نمی باشد.');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = await this.userRepo.create({
      email,
      password: hashedPassword,
    });
    await this.activateStarterPlans(user._id);
    return user;
  }

  async login(email: string, password: string) {
    const userInfo = await this.userRepo.findOne({ email });
    if (!userInfo) {
      throw new ConflictException('کاربری با این ایمیل یافت نشد.');
    }

    if (!(await bcrypt.compare(password, userInfo.password))) {
      throw new BadRequestException('رمزعبور صحیح نمی باشد.');
    }
    return userInfo;
  }

  async activateStarterPlans(userId: Types.ObjectId) {
    const plans = await this.plansRepo.find({
      type: ServicesTypes.Starter,
      status: StatusTypes.Active,
    });
    for (let i = 0; i < plans.length; i++) {
      const plan = plans[i];
      await this.userPlansRepo.create({
        planId: plan._id,
        userId,
        expiredAt: moment().add(plan.duration, 'day'),
      });
    }
  }

  async updateUserById(id: string | Types.ObjectId, user: Partial<UserModel>) {
    const userInfo = await this.userRepo.findById(id);
    if (!userInfo) {
      throw new NotFoundException('کاربری با این مشخصات یافت نشد.');
    }
    return this.userRepo.findByIdAndUpdate(id, user);
  }

  async create(id: string | Types.ObjectId, user: UserCreateDTO) {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      username,
      description,
      isAdmin,
    } = user;
    const isUserExist = await this.userRepo.findOne({ email });
    if (isUserExist) {
      throw new ConflictException('کاربری با این نام قبلا ثبت شده است.');
    }
    if (password != confirmPassword) {
      throw new BadRequestException('رمزعبور یکسان نمی باشد.');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const createdUser = await this.userRepo.create({
      email,
      password: hashedPassword,
      isAdmin,
      firstName,
      lastName,
      username,
      description,
    });
    await this.activateStarterPlans(createdUser._id);
  }
}
