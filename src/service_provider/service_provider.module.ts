import { Module } from '@nestjs/common';
import { ServiceProviderService } from './service_provider.service';
import { ServiceProviderController } from './service_provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProviderRepository } from './repositories/service_provider.repository';
import { ServiceProviderPersonalInfoRepository } from './repositories/service_provider_personal_info.respository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceProviderRepository,
      ServiceProviderPersonalInfoRepository,
    ]),
  ],
  providers: [ServiceProviderService],
  controllers: [ServiceProviderController],
})
export class ServiceProviderModule {}
