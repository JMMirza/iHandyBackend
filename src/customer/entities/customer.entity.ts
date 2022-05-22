import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username', 'email'])
export class Customer extends BaseEntity {
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

  @Column()
  email_verified: boolean;

  @Column()
  email_code: number;

  // @OneToOne(
  //   () => UserCustomerPersonalInfo,
  //   (userCustomerPersonalInfo: UserCustomerPersonalInfo) =>
  //     userCustomerPersonalInfo.userCustomer,
  // )
  // public userCustomerPersonalInfo: UserCustomerPersonalInfo;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
