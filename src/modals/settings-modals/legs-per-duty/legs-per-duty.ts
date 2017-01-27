import { Component } from '@angular/core';
import { ViewController, Events, NavParams } from 'ionic-angular';

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

  public dprow_min:string = "1";
  public dprow_max:string = "6";
  public dprow_type:string = "any";

  constructor(params: NavParams, private viewCtrl: ViewController, public events: Events) {
    if(params.get('dprow_min'))
      this.dprow_min = params.get('dprow_min');
    if(params.get('dprow_max'))
      this.dprow_max = params.get('dprow_max');
    if(params.get('dprow_type'))
      this.dprow_type = params.get('dprow_type');
  }

  save() {
    this.viewCtrl.dismiss({ dprow_min: this.dprow_min, dprow_max: this.dprow_max, dprow_type: this.dprow_type });
  }
}
