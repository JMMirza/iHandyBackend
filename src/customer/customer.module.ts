import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCustomerPersonalInfoRepository } from './repositories/personal_info.respository';
import { UserCustomerRepository } from './repositories/customer.respository';
import { JwtStrategy } from 'src/jwt/strategy/jwt-straregy';

@Module({
  imports: [
    MailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      UserCustomerRepository,
      UserCustomerPersonalInfoRepository,
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class CustomerModule {}
