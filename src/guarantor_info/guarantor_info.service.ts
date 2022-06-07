import { Injectable } from '@nestjs/common';
import { CreateGuarantorInfoDto } from './dto/create-guarantor_info.dto';
import { UpdateGuarantorInfoDto } from './dto/update-guarantor_info.dto';

@Injectable()
export class GuarantorInfoService {
  create(createGuarantorInfoDto: CreateGuarantorInfoDto) {
    return 'This action adds a new guarantorInfo';
  }

  findAll() {
    return `This action returns all guarantorInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guarantorInfo`;
  }

  update(id: number, updateGuarantorInfoDto: UpdateGuarantorInfoDto) {
    return `This action updates a #${id} guarantorInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} guarantorInfo`;
  }
}
