import { ServicesTypes } from '../../models/servicePlans.model';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlanDTO {
  @IsString({ message: 'نام پلن باید یک رشته متنی باشد.' })
  @IsNotEmpty({ message: 'نام پلن نمیتواند خالی باشد' })
  name: string;

  @IsNumber({}, { message: 'مدت زمان باید یک عدد باشد.' })
  @Min(1, { message: 'مدت زمان باید بین ۱ تا ۳۶۵ روز باشد.' })
  @Max(365, { message: 'مدت زمان باید بین ۱ تا ۳۶۵ روز باشد.' })
  @IsNotEmpty({ message: 'مدت زمان نمیتواند خالی باشد' })
  @Type(() => Number)
  duration: number;

  @IsNumber({}, { message: 'حجم باید یک عدد باشد.' })
  @Min(5000000, { message: 'حجم باید بین ۵ تا ۱۰۰ گیگابایت باشد.' })
  @Max(100000000000, { message: 'حجم باید بین ۵ تا ۱۰۰ گیگابایت باشد.' })
  @IsNotEmpty({ message: 'حجم نمیتواند خالی باشد' })
  @Type(() => Number)
  size: number;

  @IsString({ message: 'نوع اشتراک یک رشته متنی باشد.' })
  @IsEnum(ServicesTypes, { message: 'نوع اشتراک معتبر نمی باشد' })
  @IsNotEmpty({ message: 'نوع اشتراک نمیتواند خالی باشد' })
  type: ServicesTypes;

  @IsNumber({}, { message: 'قیمت باید یک عدد باشد.' })
  @Min(0, { message: 'قیمت باید بزرگ تر از ۰ باشد.' })
  @IsNotEmpty({ message: 'قیمت نمیتواند خالی باشد' })
  @Type(() => Number)
  price: number;
}
