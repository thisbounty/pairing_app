import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the Layover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-layover',
  templateUrl: 'layover.html'
})
export class LayoverPage {

  public enable_layover:boolean;
  public range:string;

  constructor(private viewCtrl: ViewController) {
    this.layoverRange();
  }

  layoverRange() {
    this.range = "4";
    for(let i = 5; i < 60; i++) {
      this.range += "," + i;
    }
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
