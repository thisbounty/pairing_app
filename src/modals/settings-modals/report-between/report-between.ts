import { Component } from '@angular/core';
import { ViewController, Events, NavParams } from 'ionic-angular';

/*
  Generated class for the ReportBetween page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-report-between',
  templateUrl: 'report-between.html'
})
export class ReportBetweenPage {

  public range:string;
  public flr_min:string;
  public flr_max:string;

  constructor(params: NavParams, private viewCtrl: ViewController, public events: Events) {
    this.reportBetweenTimeRange();
    if(params.get('flr_min'))
      this.flr_min = params.get('flr_min');
    if(params.get('flr_max'))
      this.flr_max = params.get('flr_max');
  }

  reportBetweenTimeRange() {
    this.range = "0";
    for(let i = 1; i < 24; i++) {
      this.range += "," + i;
    }
  }

  save() {
    this.viewCtrl.dismiss({ flr_min: this.flr_min, flr_max: this.flr_max});
  }
}
