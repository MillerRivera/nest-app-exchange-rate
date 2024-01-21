
import { IsNumber, IsString, IsNotEmpty, IsPositive } from "class-validator";

export class ExchangeRateDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsString()
  fromCurrency: string;

  @IsNotEmpty()
  @IsString()
  toCurrency: string;
}