import { Component } from '@angular/core';
import { ViewController, Events } from 'ionic-angular';

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
  release_between_min:string;
  release_between_max:string;

  constructor(private viewCtrl: ViewController, public events: Events) {
    this.releaseBetweenRange();
  }

  releaseBetweenRange() {
    this.range = "0";
    for(let i = 1; i < 24; i++) {
      this.range += "," + i;
    }
  }

  save() {
    this.events.publish('filter:created', "Release between filter", { release_between_min: this.release_between_min, release_between_max: this.release_between_max});
    this.viewCtrl.dismiss();
  }
}
