import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { AuthModule } from './auth/auth.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [AuthModule, ExchangeRateModule, InMemoryDBModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
