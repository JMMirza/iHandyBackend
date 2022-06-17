import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { CustomerModule } from './customer/customer.module';
import { ServiceProviderModule } from './service_provider/service_provider.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';
import { OffersModule } from './offers/offers.module';
import { GuarantorInfoModule } from './guarantor_info/guarantor_info.module';
import { PaystackModule } from 'nestjs-paystack';
import { paystackConfiguration } from './config/paystack.config';
import { AppGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';

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
    OrdersModule,
    OffersModule,
    GuarantorInfoModule,
    PaystackModule.forRoot({
      apiKey: paystackConfiguration.test_secret_key,
    }),
    ChatModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
