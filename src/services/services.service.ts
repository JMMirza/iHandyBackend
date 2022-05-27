import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesRepository } from './repositories/services.respository';
import { CreateServiceDto } from './dto/create.dto';
import { GetServiceFilterDto } from './dto/filters.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesRepository)
    private serviceRepository: ServicesRepository,
  ) {}

  async createService(createService: CreateServiceDto) {
    return this.serviceRepository.create(createService);
  }

  async getServiceById(id: number) {
    return this.serviceRepository.getServiceById(id);
  }

  async getServices(filterDto: GetServiceFilterDto) {
    return this.getServices(filterDto);
  }

  async updateService(createServiceDto: CreateServiceDto) {
    return this.updateService(createServiceDto);
  }
}
