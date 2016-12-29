import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SetLoginDetailsPage } from './settingsModals/set-login-details/set-login-details';
import { SetAirportPage } from './settingsModals/set-airport/set-airport';
import { ReportDatePage } from './settingsModals/report-date/report-date';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  }

  showSetLoginDetails() {
    let setLoginDetails = this.modalCtrl.create(SetLoginDetailsPage);
    setLoginDetails.present();
  }

  showSetAirports() {
    let setAirports = this.modalCtrl.create(SetAirportPage);
    setAirports.present();
  }

  showReportDate() {
      let reportDate = this.modalCtrl.create(ReportDatePage)
      reportDate.present();
  }

  ionViewDidLoad() {
    console.log('Hello SettingsPage Page');
  }
}
