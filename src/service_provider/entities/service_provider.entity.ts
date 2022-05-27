import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { CustomerPersonalInfo } from './personal_info.entity';

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

  //   @OneToOne(
  //     () => CustomerPersonalInfo,
  //     (customerPersonalInfo: CustomerPersonalInfo) =>
  //       customerPersonalInfo.customer,
  //   )
  //   public customerPersonalInfo: CustomerPersonalInfo;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
