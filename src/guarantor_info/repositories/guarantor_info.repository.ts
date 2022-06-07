import { EntityRepository, Repository } from 'typeorm';
import { GuarantorInfo } from '../entities/guarantor_info.entity';

@EntityRepository(GuarantorInfo)
export class GuarantorInfoRepository extends Repository<GuarantorInfo> {}
