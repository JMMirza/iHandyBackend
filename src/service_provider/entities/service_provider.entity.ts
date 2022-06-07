import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
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

  @Column()
  service_about: string;

  @Column()
  portfolio: string;

  @Column()
  portfolio1: string;

  @Column()
  portfolio2: string;

  @Column()
  portfolio3: string;

  @Column()
  portfolio4: string;

  @Column()
  portfolio5: string;

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
  @JoinColumn()
  guarantor_info: GuarantorInfo;

  @OneToMany(() => Offer, (offer) => offer.serviceProvider)
  offers: Offer[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
