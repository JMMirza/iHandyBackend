import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Customer } from 'src/customer/entities/customer.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findCustomerOrders(customer: Customer): Promise<Order[]> {
    try {
      let orders = this.find();
      return orders;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
