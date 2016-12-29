import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the PairingCredit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pairing-credit',
  templateUrl: 'pairing-credit.html'
})
export class PairingCreditPage {

  private range:string;

  constructor(private viewCtrl: ViewController) {
    this.pairingCreditRange();
  }

  pairingCreditRange() {
    this.range = "5";
    for(let i = 6; i < 35; i++) {
      this.range += "," + i;
    }
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
