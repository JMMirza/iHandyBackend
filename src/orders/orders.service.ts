import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customer/entities/customer.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/order.respository';
import { UserCustomerRepository } from 'src/customer/repositories/customer.respository';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private customerService: CustomerService,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(user_name: string) {
    console.log(user_name);
    const customer = await this.customerService.checkCustomer(user_name);
    const orders = this.orderRepository.findCustomerOrders(customer);
    if (orders) {
      return { orders: orders };
    }
    return { orders: orders, msg: 'No Orders Found' };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
