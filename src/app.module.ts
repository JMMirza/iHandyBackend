import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { CustomerModule } from './customer/customer.module';
import { ServiceProviderModule } from './service_provider/service_provider.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    MulterModule.register({
      dest: './public/customer_uploads',
    }),
    CustomerModule,
    ServiceProviderModule,
    ServicesModule,
  ],
})
export class AppModule {}
