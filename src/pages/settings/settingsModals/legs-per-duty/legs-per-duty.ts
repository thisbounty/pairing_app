import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the LegsPerDuty page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-legs-per-duty',
  templateUrl: 'legs-per-duty.html'
})
export class LegsPerDutyPage {

  constructor(private viewCtrl: ViewController) {
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
