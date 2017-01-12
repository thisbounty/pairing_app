import { Component } from '@angular/core';
import { ViewController, Events } from 'ionic-angular';

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

  public range:string;
  period_time_min:string;
  period_time_max:string;

  constructor(private viewCtrl: ViewController, public events: Events) {
    this.dutyPeriodTimeRange();
  }

  dutyPeriodTimeRange() {
    this.range = "0";
    for(let i = 1; i < 15; i++) {
      this.range += "," + i;
    }
  }

  save() {
    this.events.publish('filter:created', "Duty period time filter", { period_time_min: this.period_time_min, period_time_max: this.period_time_max});
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
