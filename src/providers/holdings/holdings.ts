import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface Holding {
  crypto: string,
  currency: string,
  amount: number,
  value?: number
}

@Injectable()
export class HoldingsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HoldingsProvider Provider');
  }

}
