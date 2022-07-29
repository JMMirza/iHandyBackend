import {
  IsDateString,
  IsMobilePhone,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '../gender.enum';

export class ServiceProviderPersonalInfoDto {
  @IsString()
  @MaxLength(20)
  surname: string;

  @IsString()
  @MaxLength(20)
  firstname: string;

  @IsString()
  @MaxLength(20)
  othernames: string;

  @IsString()
  date_of_birth: string;

  @IsMobilePhone()
  phone_number: string;

  gender: Gender;

  @IsString()
  address: string;

  @IsString()
  @MinLength(13)
  @MaxLength(15)
  national_identity_number: string;

  @IsString()
  bank_name: string;

  @IsString()
  account_holder_name: string;

  @IsString()
  bank_verification_num: string;
}
