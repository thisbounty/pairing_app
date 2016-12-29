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

  constructor(private viewCtrl: ViewController) {

  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
