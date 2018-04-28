import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/Observable/forkJoin';
import { timeoutWith } from 'rxjs/operators';
import 'rxjs/add/observable/throw';


export interface Holding {
  crypto: string,
  currency: string,
  amount: number,
  value?: number
}

@Injectable()
export class HoldingsProvider {

  holdings: Holding[] = [];

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello HoldingsProvider Provider');
  }

  addHolding(holding: Holding): void {
    this.holdings.push(holding);
  }

  removeHolding(holding): void {
    this.holdings.splice(this.holdings.indexOf(holding), 1);
  }

  saveHoldings(): void {
    this.storage.set('cryptoHoldings', this.holdings);
  }

  loadHoldings(): void {
    this.storage.get('cryptoHoldings').then(holdings => {
      if (holdings !== null) {
        this.holdings = holdings;
      }
    });
  }

  verifyHoldings(holding): Observable<any> {
    return this.http.get('https://api.cryptonator.com/api/ticker/' + holding.crypto + '-' + holding.currency).pipe(
      timeoutWith(5000, Observable.throw(new Error('Failed to verify holding.')))
    );
  }

}
