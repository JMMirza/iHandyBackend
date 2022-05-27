import { Module } from '@nestjs/common';
import { ServiceProviderService } from './service_provider.service';
import { ServiceProviderController } from './service_provider.controller';

@Module({
  providers: [ServiceProviderService],
  controllers: [ServiceProviderController]
})
export class ServiceProviderModule {}
