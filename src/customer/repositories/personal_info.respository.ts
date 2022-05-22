import { EntityRepository, Repository } from 'typeorm';
import { CustomerPersonalInfo } from '../entities/personal_info.entity';

@EntityRepository(CustomerPersonalInfo)
export class UserCustomerPersonalInfoRepository extends Repository<CustomerPersonalInfo> {}
