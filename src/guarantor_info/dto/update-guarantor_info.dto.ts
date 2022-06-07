import { PartialType } from '@nestjs/mapped-types';
import { CreateGuarantorInfoDto } from './create-guarantor_info.dto';

export class UpdateGuarantorInfoDto extends PartialType(CreateGuarantorInfoDto) {}
