import { Component } from '@angular/core';
import { ViewController, AlertController, ModalController } from 'ionic-angular';
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

  constructor(private viewCtrl: ViewController, private alertCtrl: AlertController, private modalCtrl: ModalController) {

  }

  showSetDates() {
    let setDates = this.modalCtrl.create(SetDatesPage);
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
                     console.log('Checkbox data:', data); //array
                 }} ]
    })
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
