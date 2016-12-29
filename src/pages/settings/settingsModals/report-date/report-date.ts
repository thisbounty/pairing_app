import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the ReportDate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-report-date',
  templateUrl: 'report-date.html'
})
export class ReportDatePage {

  constructor(private viewCtrl: ViewController) {
      
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
