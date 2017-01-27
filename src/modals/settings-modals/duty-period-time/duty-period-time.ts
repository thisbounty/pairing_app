import { Component } from '@angular/core';
import { ViewController, Events, NavParams } from 'ionic-angular';

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
  public duty_min:string = "00:00";
  public duty_max:string = "15:00";

  constructor(params: NavParams, private viewCtrl: ViewController, public events: Events) {
    this.dutyPeriodTimeRange();
    if(params.get('duty_min'))
      this.duty_min = params.get('duty_min');
    if(params.get('duty_max'))
      this.duty_max = params.get('duty_max');
  }

  dutyPeriodTimeRange() {
    this.range = "0";
    for(let i = 1; i < 15; i++) {
      this.range += "," + i;
    }
  }

  save() {
    this.viewCtrl.dismiss({ duty_min: this.duty_min, duty_max: this.duty_max});
  }
}
