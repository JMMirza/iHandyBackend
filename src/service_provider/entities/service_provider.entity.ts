import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { CustomerPersonalInfo } from './personal_info.entity';
import { Services } from '../../services/entities/services.entity';
import { ServiceProviderPersonalInfo } from './personal_info_service_provider.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { GuarantorInfo } from '../../guarantor_info/entities/guarantor_info.entity';

@Entity()
@Unique(['username', 'email'])
export class ServiceProvider extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true, default: false })
  email_verified: boolean;

  @Column({ nullable: true, default: false })
  personal_info: boolean;

  @Column({ nullable: true, default: null })
  email_code: number;

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
    () => ServiceProviderPersonalInfo,
    (serviceProviderPersonalInfo: ServiceProviderPersonalInfo) =>
      serviceProviderPersonalInfo.serviceProvider,
  )
  serviceProviderPersonalInfo: ServiceProviderPersonalInfo;

  @OneToOne(() => Services, (service: Services) => service.serviceProvider)
  service: Services;

  @OneToOne(
    () => GuarantorInfo,
    (guarantor_info: GuarantorInfo) => guarantor_info.guarantor_info,
  )
  guarantor_info: GuarantorInfo;

  @OneToMany(() => Offer, (offer) => offer.serviceProvider)
  offers: Offer[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
