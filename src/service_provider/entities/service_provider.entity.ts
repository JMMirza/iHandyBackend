import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { CustomerPersonalInfo } from './personal_info.entity';
import { Services } from '../../services/entities/services.entity';
import { ServiceProviderPersonalInfo } from './personal_info_service_provider.entity';

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

  @OneToOne(
    () => ServiceProviderPersonalInfo,
    (serviceProviderPersonalInfo: ServiceProviderPersonalInfo) =>
      serviceProviderPersonalInfo.serviceProvider,
  )
  public serviceProviderPersonalInfo: ServiceProviderPersonalInfo;

  @ManyToMany(() => Services, (services) => services.serviceProvider, {
    cascade: true,
  })
  @JoinTable()
  services: Services[];

  addServices(services: Services) {
    if (this.services == null) {
      this.services = new Array<Services>();
    }
    this.services.push(services);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
