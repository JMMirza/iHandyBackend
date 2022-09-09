import { Order } from 'src/orders/entities/order.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
// import { CustomerPersonalInfo } from './personal_info.entity';
import { ServiceProvider } from '../../service_provider/entities/service_provider.entity';

@Entity()
@Unique(['name'])
export class Services extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @OneToOne(
    () => ServiceProvider,
    (serviceProvider: ServiceProvider) => serviceProvider.service,
  )
  @JoinColumn()
  serviceProvider: ServiceProvider;

  @OneToOne(() => Order, (order: Order) => order.service)
  @JoinColumn()
  order: Order;
}
