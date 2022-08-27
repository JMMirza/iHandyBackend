import { IsMobilePhone, IsString, MaxLength } from 'class-validator';
import { Gender } from '../gender.enum';

export class UserCustomerPersonalInfoDto {
  // @IsString()
  // @MaxLength(20)
  surname: string;

  // @IsString()
  // @MaxLength(20)
  firstname: string;

  // @IsString()
  // @MaxLength(20)
  // othernames: string;

  // @IsString()
  date_of_birth: string;

  // @IsMobilePhone()
  phone_number: string;

  gender: Gender;
}
