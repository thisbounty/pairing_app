import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { SettingsStorage } from '../../providers/settings-storage';
import { Api } from '../../providers/api';
import { SetAirportPage } from './settingsModals/set-airport/set-airport';
import { SetLoginDetailsPage } from './settingsModals/set-login-details/set-login-details';

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

  public username:string;
  public password:string;
  public readyToLogin:boolean;
  private settingsStorage:SettingsStorage;
  private api:Api;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  }
  
  showSetLoginDetails() {
    let setLoginDetails = this.modalCtrl.create(SetLoginDetailsPage);
    setLoginDetails.present();
  }
  
  setSetAirports() {
    let setAirports = this.modalCtrl.create(SetAirportPage);
    setAirports.present();
  }

  ionViewDidLoad() {
    console.log('Hello SettingsPage Page');
  }
}