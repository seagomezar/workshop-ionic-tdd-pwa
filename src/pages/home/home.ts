import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';

import { CurrencyPipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public holdingsProvider: HoldingsProvider) {

  }

  ionViewDidEnter(): void {
    this.holdingsProvider.loadHoldings();
  }

  addHolding(): void {
    this.navCtrl.push('AddHoldingPage');
  }

  refreshPrices(refresher): void {
    this.holdingsProvider.fetchPrices(refresher);
  }

}
