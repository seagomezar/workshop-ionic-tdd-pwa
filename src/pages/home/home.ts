import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public holdingsProvider: HoldingsProvider) {

  }

  ionViewDidEnter(): void {
  }

}
