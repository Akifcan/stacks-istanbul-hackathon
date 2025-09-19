import { IsNotEmpty, IsString, IsNumber, Length, Matches } from 'class-validator';

export class NewCardDto {
  @IsNotEmpty()
  @IsString()
  @Length(16, 19)
  @Matches(/^[0-9]+$/, { message: 'Card number must contain only digits' })
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  cardholderName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  @Matches(/^(0[1-9]|1[0-2])$/, { message: 'Month must be between 01-12' })
  expiryMonth: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  @Matches(/^[0-9]{2}$/, { message: 'Year must be 2 digits' })
  expiryYear: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 4)
  @Matches(/^[0-9]+$/, { message: 'CVV must contain only digits' })
  cvv: string;

  @IsNotEmpty()
  @IsNumber()
  minOrderLimit: number

  @IsNotEmpty()
  @IsNumber()
  buyAmount: number
}