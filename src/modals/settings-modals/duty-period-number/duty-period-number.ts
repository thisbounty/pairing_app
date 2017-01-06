import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the DutyPeriodNumber page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-duty-period-number',
  templateUrl: 'duty-period-number.html'
})
export class DutyPeriodNumberPage {

  constructor(private viewCtrl: ViewController) {

  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
