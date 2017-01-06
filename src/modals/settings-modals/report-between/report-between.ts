import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

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

  constructor(private viewCtrl: ViewController) {
    this.reportBetweenTimeRange();
  }

  reportBetweenTimeRange() {
    this.range = "0";
    for(let i = 1; i < 24; i++) {
      this.range += "," + i;
    }
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
