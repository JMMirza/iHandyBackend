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
import { jwtConfigurations } from '../config/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtConfigurations),
    TypeOrmModule.forFeature([
      UserCustomerRepository,
      UserCustomerPersonalInfoRepository,
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class CustomerModule {}
