import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/order.respository';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    CustomerModule,
    TypeOrmModule.forFeature([OrderRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
