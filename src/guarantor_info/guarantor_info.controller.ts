import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuarantorInfoService } from './guarantor_info.service';
import { CreateGuarantorInfoDto } from './dto/create-guarantor_info.dto';
import { UpdateGuarantorInfoDto } from './dto/update-guarantor_info.dto';

@Controller('guarantor-info')
export class GuarantorInfoController {
  constructor(private readonly guarantorInfoService: GuarantorInfoService) {}

  @Post()
  create(@Body() createGuarantorInfoDto: CreateGuarantorInfoDto) {
    return this.guarantorInfoService.create(createGuarantorInfoDto);
  }

  @Get()
  findAll() {
    return this.guarantorInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guarantorInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuarantorInfoDto: UpdateGuarantorInfoDto) {
    return this.guarantorInfoService.update(+id, updateGuarantorInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guarantorInfoService.remove(+id);
  }
}
