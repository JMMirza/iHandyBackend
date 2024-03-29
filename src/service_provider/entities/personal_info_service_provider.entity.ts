// import { Customer } from './customer.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../gender.enum';
import { ServiceProvider } from './service_provider.entity';

@Entity()
// @Unique()
export class ServiceProviderPersonalInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surname: string;

  @Column()
  firstname: string;

  @Column({ nullable: true })
  othernames: string;

  @Column()
  date_of_bith: string;

  @Column()
  gender: Gender;

  @Column()
  phone_number: string;

  @Column()
  profile_picture: string;

  @Column('text')
  address: string;

  @Column()
  national_identity_number: string;

  @Column()
  national_identity_front_img: string;

  @Column()
  national_identity_back_img: string;

  @Column()
  photo_of_you_card: string;

  @Column()
  bank_name: string;

  @Column()
  account_holder_name: string;

  @Column()
  bank_verification_num: string;

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

  // @Column()
  @OneToOne(() => ServiceProvider)
  @JoinColumn()
  serviceProvider: ServiceProvider;
}
