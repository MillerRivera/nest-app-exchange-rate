import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { ExchangeRateDto } from './dto/exchange-rate.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Post('calculate-exchange-rate')
  @UseGuards(JwtAuthGuard)
  calculateExchangeRate(@Body() exchangeDto: ExchangeRateDto) {
    return this.exchangeRateService.calculateExchangeRate(exchangeDto);
  }

  @Post('init-exchange-rates')
  createExchangeRates() {
    return this.exchangeRateService.initExchangeRates();
  }

  @Post('update-exchange-rate-by-currency-symbol')
  @UseGuards(JwtAuthGuard)
  updateExchangeRate(@Body() updateExchangeDto: UpdateExchangeRateDto) {
    return this.exchangeRateService.updateExchangeRate(updateExchangeDto);
  }

  
}
