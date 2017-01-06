import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

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

  constructor(private viewCtrl: ViewController) {
    this.releaseBetweenRange();
  }

  releaseBetweenRange() {
    this.range = "0";
    for(let i = 1; i < 24; i++) {
      this.range += "," + i;
    }
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
