import { Module } from '@nestjs/common';
import { ServiceProviderService } from './service_provider.service';
import { ServiceProviderController } from './service_provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProviderRepository } from './repositories/service_provider.repository';
import { ServiceProviderPersonalInfoRepository } from './repositories/service_provider_personal_info.respository';
import { MailModule } from 'src/mail/mail.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/strategy/jwt-straregy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      ServiceProviderRepository,
      ServiceProviderPersonalInfoRepository,
    ]),
    ConfigModule.forRoot(),
  ],
  providers: [ServiceProviderService, JwtStrategy],
  controllers: [ServiceProviderController],
  exports: [JwtStrategy, PassportModule],
})
export class ServiceProviderModule {}
