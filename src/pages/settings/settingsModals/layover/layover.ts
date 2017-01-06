import { Component } from '@angular/core';
import { ViewController, AlertController, ModalController } from 'ionic-angular';
import { SetDatesPage } from '../../../../modals/settings-modals/set-dates/set-dates';

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
  public relationship:any;

  constructor(private viewCtrl: ViewController, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.layoverRange();
  }

  test() {
    console.log(this.relationship);
  }

  showSetDates() {
    let setDates = this.modalCtrl.create(SetDatesPage);
    setDates.present();
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
