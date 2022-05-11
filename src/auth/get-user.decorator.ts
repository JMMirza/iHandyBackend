import { createParamDecorator } from '@nestjs/common';
import { UserCustomer } from './user_customer.entity';

export const GetUser = createParamDecorator((data, req): UserCustomer => {
  return req.user;
});
