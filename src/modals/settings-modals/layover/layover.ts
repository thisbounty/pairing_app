import { Component } from '@angular/core';
import { ViewController, AlertController, ModalController, Events } from 'ionic-angular';
import { SetDatesPage } from '../../../modals/settings-modals/set-dates/set-dates';

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

  public layover_condition:string;
  public dates:Array<{ text: string, value: string }> = [];
  public days_of_the_week:string[];
  public enable_layover:boolean = false;
  public enforce_layover_min:string;
  public enforce_layover_max:string;
  public range:string;

  constructor(private viewCtrl: ViewController, private alertCtrl: AlertController, private modalCtrl: ModalController, public events: Events) {
    this.layoverRange();
  }

  save() {
    this.events.publish('filter:created', "Layover filter", { layover_condition: this.layover_condition, dates: this.dates, days_of_the_week: this.days_of_the_week, enable_layover: this.enable_layover, enforce_layover_min: this.enforce_layover_min, enforce_layover_max: this.enforce_layover_max });
    this.viewCtrl.dismiss();
  }

  showSetDates() {
    let setDates = this.modalCtrl.create(SetDatesPage, { dates: this.dates });
    setDates.onDidDismiss(dates => {
      this.dates = dates;
    });
    setDates.present();
  }

  layoverRange() {
    this.range = "4";
    for(let i = 5; i < 60; i++) {
      this.range += "," + i;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
