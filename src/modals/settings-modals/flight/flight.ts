import { Component } from '@angular/core';
import { ViewController, AlertController, ModalController, Events, NavParams } from 'ionic-angular';
import { SetDatesPage } from '../../../modals/settings-modals/set-dates/set-dates';

/*
  Generated class for the Flight page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-flight',
  templateUrl: 'flight.html'
})
export class FlightPage {

  public flight_con:boolean = false;
  public flight_num:string;
  public flight_dow:string[];
  public flight_dates:Array<{ text: string, value: string }> = [];

  constructor(params: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private modalCtrl: ModalController, public events: Events) {
    if(params.get('flight_con'))
      this.flight_con = params.get('flight_con');
    if(params.get('flight_num'))
      this.flight_num = params.get('flight_num');
    if(params.get('flight_dow'))
      this.flight_dow = params.get('flight_dow');
    if(params.get('flight_dates'))
      this.flight_dates = params.get('flight_dates');
  }

  save() {
    this.viewCtrl.dismiss({ flight_con: this.flight_con, flight_num: this.flight_num, flight_dow: this.flight_dow, flight_dates: this.flight_dates });
  }

  showSetDates() {
    let setDates = this.modalCtrl.create(SetDatesPage, { dates: this.flight_dates });
    setDates.onDidDismiss(dates => {
      this.flight_dates = dates;
    });
    setDates.present();
  }

  showDaysOfTheWeekSetttings() {
    let alert = this.alertCtrl.create({
      title: 'Days of the week',
      inputs: [ { type: 'checkbox', label: 'Monday', value: 'monday' },
                { type: 'checkbox', label: 'Tuesday', value: 'tuesday' },
                { type: 'checkbox', label: 'Wednesday', value: 'wednesday' },
                { type: 'checkbox', label: 'Thursday', value: 'thursday' },
                { type: 'checkbox', label: 'Friday', value: 'friday' },
                { type: 'checkbox', label: 'Saturday', value: 'saturday' },
                { type: 'checkbox', label: 'Sunday', value: 'sunday' } ],
      buttons: [ { text: 'Cancel', role: 'cancel' },
                 { text: 'Okay',
                   handler: data => {
                     this.flight_dow = data;
                 }} ]
    })
    alert.present();
  }
}
