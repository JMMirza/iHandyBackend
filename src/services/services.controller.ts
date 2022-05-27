import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create.dto';
import { GetServiceFilterDto } from './dto/filters.dto';
import { Services } from './entities/services.entity';

@Controller('services')
export class ServicesController {
  constructor(private serviceService: ServicesService) {}

  @Post('/create')
  create(@Body(ValidationPipe) createServiceDto: CreateServiceDto) {
    return this.serviceService.createService(createServiceDto);
  }

  @Get()
  getServices(
    @Query(ValidationPipe) filterDto: GetServiceFilterDto,
  ): Promise<Services[]> {
    return this.serviceService.getServices(filterDto);
  }

  @Get('/:id')
  getServiceById(@Param('id', ParseIntPipe) id: number) {
    this.serviceService.getServiceById(id);
  }
}
