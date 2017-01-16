import { Component } from '@angular/core';
import { ViewController, AlertController, ModalController, Events, NavParams } from 'ionic-angular';
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

  public layover_con:string;
  public layover_dates:Array<{ text: string, value: string }> = [];
  public layover_dow:string[];
  public layover_range_checkbox:boolean = false;
  public layover_min:string;
  public layover_max:string;
  public range:string;

  constructor(params: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private modalCtrl: ModalController, public events: Events) {
    this.layoverRange();
    if(params.get('layover_con'))
      this.layover_con = params.get('layover_con');
    if(params.get('layover_dates'))
      this.layover_dates = params.get('layover_dates');
    if(params.get('layover_dow'))
      this.layover_dow = params.get('layover_dow');
    if(params.get('layover_range_checkbox'))
      this.layover_range_checkbox = params.get('layover_range_checkbox');
    if(params.get('layover_min'))
      this.layover_min = params.get('layover_min');
    if(params.get('layover_max'))
      this.layover_max = params.get('layover_max');
  }

  save() {
    this.viewCtrl.dismiss({ layover_con: this.layover_con, layover_dates: this.layover_dates, layover_dow: this.layover_dow, layover_range_checkbox: this.layover_range_checkbox, layover_min: this.layover_min, layover_max: this.layover_max });
  }

  showSetDates() {
    let setDates = this.modalCtrl.create(SetDatesPage, { dates: this.layover_dates });
    setDates.onDidDismiss(dates => {
      this.layover_dates = dates;
    });
    setDates.present();
  }

  layoverRange() {
    this.range = "4";
    for(let i = 5; i < 60; i++) {
      this.range += "," + i;
    }
  }
}
