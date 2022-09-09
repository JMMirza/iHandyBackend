import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findCustomerOrders(customer_id: number): Promise<Order[]> {
    try {
      let orders = this.find({ where: { customerId: customer_id } });
      return orders;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
