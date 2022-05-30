import { EntityRepository, Repository } from 'typeorm';
import { ServiceProviderPersonalInfo } from '../entities/personal_info_service_provider.entity';

@EntityRepository(ServiceProviderPersonalInfo)
export class ServiceProviderPersonalInfoRepository extends Repository<ServiceProviderPersonalInfo> {}
