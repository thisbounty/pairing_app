import { Component } from '@angular/core';
import { ViewController, Events } from 'ionic-angular';

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
  report_between_min:string;
  report_between_max:string;

  constructor(private viewCtrl: ViewController, public events: Events) {
    this.reportBetweenTimeRange();
  }

  reportBetweenTimeRange() {
    this.range = "0";
    for(let i = 1; i < 24; i++) {
      this.range += "," + i;
    }
  }

  save() {
    this.events.publish('filter:created', "Report between filter", { report_between_min: this.report_between_min, report_between_max: this.report_between_max});
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
