import { Component } from '@angular/core';
import { ViewController, Events } from 'ionic-angular';

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

  public range:string;
  pairing_credit_min:string;
  pairing_credit_max:string;

  constructor(private viewCtrl: ViewController, public events: Events) {
    this.pairingCreditRange();
  }

  pairingCreditRange() {
    this.range = "5";
    for(let i = 6; i < 35; i++) {
      this.range += "," + i;
    }
  }

  save() {
    this.events.publish('filter:created', "Pairing credit filter", { pairing_credit_min: this.pairing_credit_min, pairing_credit_max: this.pairing_credit_max});
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
