import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SignupDTO {
  @IsString({ message: 'ایمیل باید یک رشته متنی باشد.' })
  @IsEmail({}, { message: 'ایمیل معتبر نمی باشد.' })
  @IsNotEmpty({ message: 'ایمیل نمیتواند خالی باشد' })
  email: string;

  @IsString({ message: 'رمزعبور باید یک رشته متنی باشد.' })
  @MinLength(8, { message: 'رمز عبور باید بین ۸ تا ۳۲ کاراکتر باشد.' })
  @MaxLength(32, { message: 'رمز عبور باید بین ۸ تا ۳۲ کاراکتر باشد.' })
  @IsNotEmpty({ message: 'رمزعبور نمیتواند خالی باشد' })
  password: string;

  @IsString({ message: 'تکرار رمزعبور باید یک رشته متنی باشد.' })
  @MinLength(8, { message: 'تکرار رمز عبور باید بین ۸ تا ۳۲ کاراکتر باشد.' })
  @MaxLength(32, { message: 'تکرار رمز عبور باید بین ۸ تا ۳۲ کاراکتر باشد.' })
  @IsNotEmpty({ message: 'تکرار رمزعبور نمیتواند خالی باشد' })
  confirmPassword: string;
}

export class LoginDTO {
  @IsString({ message: 'ایمیل باید یک رشته متنی باشد.' })
  @IsEmail({}, { message: 'ایمیل معتبر نمی باشد.' })
  @IsNotEmpty({ message: 'ایمیل نمیتواند خالی باشد' })
  email: string;

  @IsString({ message: 'رمزعبور باید یک رشته متنی باشد.' })
  @MinLength(8, { message: 'رمز عبور باید بین ۸ تا ۳۲ کاراکتر باشد.' })
  @MaxLength(32, { message: 'رمز عبور باید بین ۸ تا ۳۲ کاراکتر باشد.' })
  @IsNotEmpty({ message: 'رمزعبور نمیتواند خالی باشد' })
  password: string;
}

export class UserUpdateDTO {
  @IsString({ message: 'نام کاربری باید یک رشته متنی باشد.' })
  @MinLength(3, { message: 'نام کاربری باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  @MaxLength(16, { message: 'نام کاربری باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  @IsNotEmpty({ message: 'نام کاربری نمیتواند خالی باشد' })
  username: string;
  @IsString({ message: 'نام باید یک رشته متنی باشد.' })
  @MinLength(3, { message: 'نام باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  @MaxLength(16, { message: 'نام باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  firstName: string;
  @IsString({ message: 'نام خانوادگی باید یک رشته متنی باشد.' })
  @MinLength(3, { message: 'نام خانوادگی باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  @MaxLength(16, { message: 'نام خانوادگی باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  lastName: string;
  @IsString({ message: 'توضیحات باید یک رشته متنی باشد.' })
  @MinLength(3, { message: 'توضیحات باید بین ۳ تا ۲۵۰ کاراکتر باشد.' })
  @MaxLength(250, { message: 'توضیحات باید بین ۳ تا ۲۵۰ کاراکتر باشد.' })
  description: string;
}

export class UserCreateDTO {
  @IsString({ message: 'نام کاربری باید یک رشته متنی باشد.' })
  @MinLength(3, { message: 'نام کاربری باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  @MaxLength(16, { message: 'نام کاربری باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  @IsNotEmpty({ message: 'نام کاربری نمیتواند خالی باشد' })
  username: string;
  @IsString({ message: 'نام باید یک رشته متنی باشد.' })
  @MinLength(3, { message: 'نام باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  @MaxLength(16, { message: 'نام باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  firstName: string;
  @IsString({ message: 'نام خانوادگی باید یک رشته متنی باشد.' })
  @MinLength(3, { message: 'نام خانوادگی باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  @MaxLength(16, { message: 'نام خانوادگی باید بین ۳ تا ۱۶ کاراکتر باشد.' })
  lastName: string;
  @IsString({ message: 'توضیحات باید یک رشته متنی باشد.' })
  @MinLength(3, { message: 'توضیحات باید بین ۳ تا ۲۵۰ کاراکتر باشد.' })
  @MaxLength(250, { message: 'توضیحات باید بین ۳ تا ۲۵۰ کاراکتر باشد.' })
  description: string;

  @IsString({ message: 'ایمیل باید یک رشته متنی باشد.' })
  @IsEmail({}, { message: 'ایمیل معتبر نمی باشد.' })
  @IsNotEmpty({ message: 'ایمیل نمیتواند خالی باشد' })
  email: string;

  @IsString({ message: 'رمزعبور باید یک رشته متنی باشد.' })
  @MinLength(8, { message: 'رمز عبور باید بین ۸ تا ۳۲ کاراکتر باشد.' })
  @MaxLength(32, { message: 'رمز عبور باید بین ۸ تا ۳۲ کاراکتر باشد.' })
  @IsNotEmpty({ message: 'رمزعبور نمیتواند خالی باشد' })
  password: string;

  @IsString({ message: 'تکرار رمزعبور باید یک رشته متنی باشد.' })
  @MinLength(8, { message: 'تکرار رمز عبور باید بین ۸ تا ۳۲ کاراکتر باشد.' })
  @MaxLength(32, { message: 'تکرار رمز عبور باید بین ۸ تا ۳۲ کاراکتر باشد.' })
  @IsNotEmpty({ message: 'تکرار رمزعبور نمیتواند خالی باشد' })
  confirmPassword: string;

  @IsNumber({}, { message: 'مقدار دسترسی ادمین معتبر نمی باشد.' })
  @Min(0, { message: 'مقدار دسترسی ادمین معتبر نمی باشد.' })
  @Max(1, { message: 'مقدار دسترسی ادمین معتبر نمی باشد.' })
  @Type((type) => Number)
  isAdmin: 0 | 1;
}
