import { Gender } from 'src/customer/gender.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceProvider } from '../../service_provider/entities/service_provider.entity';

@Entity()
export class GuarantorInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surname: string;

  @Column()
  firstname: string;

  @Column()
  other_name: string;

  @Column()
  profile_picture: string;

  @Column()
  gender: Gender;

  @Column()
  relationship: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column()
  national_id: string;

  @Column()
  occupation: string;

  @OneToOne(
    () => ServiceProvider,
    (serviceProvider) => serviceProvider.guarantor_info,
  ) // specify inverse side as a second parameter
  guarantor_info: GuarantorInfo;

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
}
