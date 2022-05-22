import { Customer } from './customer.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gender } from '../gender.enum';

@Entity()
// @Unique()
export class CustomerPersonalInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surname: string;

  @Column()
  firstname: string;

  @Column()
  othernames: string;

  @Column()
  date_of_bith: string;

  @Column()
  gender: Gender;

  @Column()
  phone_number: string;

  @Column()
  profile_picture: string;

  @OneToOne(() => Customer)
  @JoinColumn()
  public customer: Customer;
}
