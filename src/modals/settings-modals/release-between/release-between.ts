import { Component } from '@angular/core';
import { ViewController, Events, NavParams } from 'ionic-angular';

/*
  Generated class for the ReleaseBetween page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-release-between',
  templateUrl: 'release-between.html'
})
export class ReleaseBetweenPage {

  public range:string;
  public llr_min:string;
  public llr_max:string;

  constructor(params: NavParams, private viewCtrl: ViewController, public events: Events) {
    this.releaseBetweenRange();
    if(params.get('llr_min'))
      this.llr_min = params.get('llr_min');
    if(params.get('llr_max'))
      this.llr_max = params.get('llr_max');
  }

  releaseBetweenRange() {
    this.range = "0";
    for(let i = 1; i < 24; i++) {
      this.range += "," + i;
    }
  }

  save() {
    this.viewCtrl.dismiss({ llr_min: this.llr_min, llr_max: this.llr_max});
  }
}
