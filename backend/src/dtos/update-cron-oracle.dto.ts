import { IsOptional, IsString } from 'class-validator';

export class UpdateCronOracleDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  frequency?: string;
}
