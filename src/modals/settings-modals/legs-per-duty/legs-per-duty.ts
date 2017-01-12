import { Component } from '@angular/core';
import { ViewController, Events } from 'ionic-angular';

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

  legs_per_duty_min:string;
  legs_per_duty_max:string;
  duty_period:string;

  constructor(private viewCtrl: ViewController, public events: Events) {
  }

  save() {
    this.events.publish('filter:created', "Legs per duty filter", { legs_per_duty_min: this.legs_per_duty_min, legs_per_duty_max: this.legs_per_duty_max, duty_period: this.duty_period });
    this.viewCtrl.dismiss();
  }
}
