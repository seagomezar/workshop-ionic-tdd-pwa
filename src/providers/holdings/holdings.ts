import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface Holding {
  crypto: string,
  currency: string,
  amount: number,
  value?: number
}

@Injectable()
export class HoldingsProvider {

  holdings: Holding[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello HoldingsProvider Provider');
  }

  addHolding(holding: Holding): void {
    this.holdings.push(holding);
  }

  removeHolding(holding): void {
    this.holdings.splice(this.holdings.indexOf(holding), 1);
  }

}
