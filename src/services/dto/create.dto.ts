import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  image: string;
}
