import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the DutyPeriodTime page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-duty-period-time',
  templateUrl: 'duty-period-time.html'
})
export class DutyPeriodTimePage {

  private range:string;

  constructor(private viewCtrl: ViewController) {
    this.dutyPeriodTimeRange();
  }

  dutyPeriodTimeRange() {
    this.range = "0";
    for(let i = 1; i < 15; i++) {
      this.range += "," + i;
    }
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
