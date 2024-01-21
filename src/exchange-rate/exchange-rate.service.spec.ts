import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateDto } from './dto/exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { CurrencyNotFoundException } from '../exceptions/currency-not-found.exception';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeRateService, InMemoryDBService],
    }).compile();

    service = module.get<ExchangeRateService>(ExchangeRateService);
  });

  describe('initExchangeRates', () => {
    it('should initialize exchange rates from static JSON file', () => {
      const result = service.initExchangeRates();

      expect(result).toEqual([
        { id: '1', symbol: 'USD', rate: 1.0 },
        { id: '2', symbol: 'EUR', rate: 0.85 },
        { id: '3', symbol: 'PEN', rate: 3.60 },
        { id: '4', symbol: 'MXN', rate: 5.50 },
      ]);
    });
  });

  describe('calculateExchangeRate', () => {
    it('should calculate exchange rate', () => {
      const exchangeRateDto: ExchangeRateDto = {
        amount: 100,
        fromCurrency: 'USD',
        toCurrency: 'EUR',
      };

      const result = service.calculateExchangeRate(exchangeRateDto);

      expect(result).toEqual({
        amount: 100,
        convertedAmount: 85,
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        exchangeRate: { id: '2', symbol: 'EUR', rate: 0.85 },
      });
    });

    it('should throw CurrencyNotFoundException for invalid fromCurrency', () => {
      const exchangeRateDto: ExchangeRateDto = {
        amount: 100,
        fromCurrency: 'INVALID',
        toCurrency: 'EUR',
      };

      expect(() => service.calculateExchangeRate(exchangeRateDto)).toThrowError(
        CurrencyNotFoundException,
      );
    });

    // Add more test cases for calculateExchangeRate as needed
  });

  describe('updateExchangeRate', () => {
    it('should update exchange rate', () => {
      const updateExchangeRateDto: UpdateExchangeRateDto = {
        symbol: 'USD',
        rate: 1.1,
      };

      const result = service.updateExchangeRate(updateExchangeRateDto);

      expect(result).toEqual({
        status: 200,
        message: 'Updated',
        exchangeRateUpdate: { id: '1', symbol: 'USD', rate: 1.1 },
      });
    });

    it('should throw CurrencyNotFoundException for invalid symbol', () => {
      const updateExchangeRateDto: UpdateExchangeRateDto = {
        symbol: 'INVALID',
        rate: 1.1,
      };

      expect(() => service.updateExchangeRate(updateExchangeRateDto)).toThrowError(
        CurrencyNotFoundException,
      );
    });

    // Add more test cases for updateExchangeRate as needed
  });
});