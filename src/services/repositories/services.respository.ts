import { EntityRepository, Repository } from 'typeorm';
import { Services } from '../entities/services.entity';
import { CreateServiceDto } from '../dto/create.dto';
import { GetServiceFilterDto } from '../dto/filters.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Services)
export class ServicesRepository extends Repository<Services> {
  async getServiceById(id: number): Promise<any> {
    const service = await Services.findOne({ id });
    if (service) {
      return service;
    } else {
      return new BadRequestException('No Record Found');
    }
  }

  async getAllServices(filterDto: GetServiceFilterDto): Promise<Services[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('services');
    if (search) {
      query.andWhere('(services.name LIKE :search)', { search: `%${search}%` });
    }
    const services = await query.getMany();
    return services;
  }

  async createSerive(createServiceDto: CreateServiceDto): Promise<object> {
    const { name, image } = createServiceDto;
    const new_service = new Services();
    new_service.name = name;
    new_service.image = image;
    try {
      const service = await new_service.save();
      return { msg: 'Service Created Successfully', serives: service };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateService(createServiceDto: CreateServiceDto) {
    const { name, image } = createServiceDto;
    const service = await Services.findOne({ name });
    if (service) {
      service.name = name;
      service.image = image;
      try {
        await service.save();
        return { msg: 'Service updated Successfully', services: service };
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    } else {
      throw new BadRequestException('No Service found');
    }
  }
}
