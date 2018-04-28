import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';

@IonicPage()
@Component({
  selector: 'page-add-holding',
  templateUrl: 'add-holding.html',
})
export class AddHoldingPage {

  public noConnection: boolean = false;
  private cryptoUnavailable: boolean = false;
  private checkingValidity: boolean = false;
  public cryptoCode: string;
  public displayCurrency: string;
  public amountHolding: number;
  public invalidInput: boolean = false;

  constructor(public navCtrl: NavController, public holdingsProvider: HoldingsProvider) {
  }

  validateInputs(): boolean {
    if(this.cryptoCode && this.displayCurrency && this.amountHolding) {
      return true;
    }
    this.invalidInput = true;
    return false;
  }

  addHolding(): void {
    this.invalidInput = false;
    this.cryptoUnavailable = false;
    this.noConnection = false;
    this.checkingValidity = true;

    let holding = {
      crypto: this.cryptoCode,
      currency: this.displayCurrency,
      amount: this.amountHolding || 0
    };

    this.holdingsProvider.verifyHoldings(holding).subscribe((result) => {

      this.checkingValidity = false;

      if(result.success) {
        this.holdingsProvider.addHolding(holding);
        this.navCtrl.pop();
      } else {
        this.cryptoUnavailable = true;
      }

    }, err => {
      this.noConnection = true;
      this.checkingValidity = false;
    });
  }

}
