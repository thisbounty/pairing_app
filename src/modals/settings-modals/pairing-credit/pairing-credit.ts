import { Component } from '@angular/core';
import { ViewController, Events, NavParams } from 'ionic-angular';

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
  public tcr_min:string = "05:00";
  public tcr_max:string = "35:00";

  constructor(params: NavParams, private viewCtrl: ViewController, public events: Events) {
    this.pairingCreditRange();
    if(params.get('tcr_min'))
      this.tcr_min = params.get('tcr_min');
    if(params.get('tcr_max'))
      this.tcr_max = params.get('tcr_max');
  }

  pairingCreditRange() {
    this.range = "5";
    for(let i = 6; i < 35; i++) {
      this.range += "," + i;
    }
  }

  save() {
    this.viewCtrl.dismiss({ tcr_min: this.tcr_min, tcr_max: this.tcr_max});
  }
}
