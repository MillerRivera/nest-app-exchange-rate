import { IsNumber, IsString, IsNotEmpty, IsPositive } from "class-validator";

export class UpdateExchangeRateDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  rate: number;

  @IsNotEmpty()
  @IsString()
  symbol: string;
}