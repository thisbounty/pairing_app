import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the NumberOfCalendarDays page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-number-of-calendar-days',
  templateUrl: 'number-of-calendar-days.html'
})
export class NumberOfCalendarDaysPage {

  constructor(private viewCtrl: ViewController) {

  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
