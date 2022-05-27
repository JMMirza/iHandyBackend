import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetServiceFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
