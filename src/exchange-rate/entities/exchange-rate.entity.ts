import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface ExchangeRate extends InMemoryDBEntity {
    symbol: string;
    rate: number;
}