import { HttpCode, Injectable } from '@nestjs/common';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { ExchangeRateDto } from './dto/exchange-rate.dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ExchangeRate } from './entities/exchange-rate.entity';
import { CurrencyNotFoundException } from '../exceptions/currency-not-found.exception';

@Injectable()
export class ExchangeRateService {

  constructor(private readonly exchangeRateInmemoryDB: InMemoryDBService<ExchangeRate>) {}

  initExchangeRates(){
    const exchangeRatesObjects = this.createExchangeRates();
    this.exchangeRateInmemoryDB.createMany(exchangeRatesObjects);
    return this.exchangeRateInmemoryDB.getAll();
  }

  createExchangeRates(): ExchangeRate[] {
    return [
      {
        id: '1',
        symbol: 'USD',
        rate: 1.0
      },
      {
        id: '2',
        symbol: 'EUR',
        rate: 0.85
      },
      {
        id: '3',
        symbol: 'PEN',
        rate: 3.60
      },
      {
        id: '4',
        symbol: 'MXN',
        rate: 5.50
      }
    ];
  }

  
  calculateExchangeRate(exchangeRateDto: ExchangeRateDto) {
    const { amount, fromCurrency, toCurrency } = exchangeRateDto;
    
    
    const rateFrom = this.exchangeRateInmemoryDB.query((exchangeRate) => exchangeRate.symbol === fromCurrency);
    if (!rateFrom.length) {
      throw new CurrencyNotFoundException(`Currency not found : `+fromCurrency);
    }

    const rateTo = this.exchangeRateInmemoryDB.query((exchangeRate) => exchangeRate.symbol === toCurrency);
    if (!rateTo.length) {
      throw new CurrencyNotFoundException(`Currency not found : `+toCurrency);
    }

    const convertedAmount = (amount / rateFrom[0].rate) * rateTo[0].rate;

    return {
      amount,
      convertedAmount,
      fromCurrency,
      toCurrency,
      exchangeRate: rateTo,
    };
  }

  updateExchangeRate(updateExchangeRate: UpdateExchangeRateDto) {
    const { symbol, rate } = updateExchangeRate;

    const currencyBySymbol = this.exchangeRateInmemoryDB.query((exchangeRate) => exchangeRate.symbol === symbol);

    if (!currencyBySymbol.length) {
      throw new CurrencyNotFoundException(`Currency Symbol not found : `+symbol);
    }

    const exchangeRateUpdate : ExchangeRate = {
      id: currencyBySymbol[0].id,
      symbol: symbol,
      rate: rate
    }

    this.exchangeRateInmemoryDB.update(exchangeRateUpdate);
    return { status: 200, message: "Updated", exchangeRateUpdate};
  }


}
