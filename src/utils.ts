import { plainToClass } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

export const validateBody = async (data: Object, dto: new () => any) => {
  const convertedClass = plainToClass(dto, data);
  const validationsResult = await validate(convertedClass);
  const errors = validationsResult
    .map((value) => Object.values(value.constraints))
    .flat();

  if (errors.length) {
    throw new BadRequestException(errors);
  }
};
