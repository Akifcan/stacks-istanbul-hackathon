import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCronOracleDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  frequency: string;
}
