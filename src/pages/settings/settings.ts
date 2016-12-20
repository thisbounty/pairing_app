import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { SettingsStorage } from '../../providers/settings-storage';
import { Api } from '../../providers/api';
import { SetAirportPage } from './settingsModals/set-airport';

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

  constructor(public navCtrl: NavController, platform:Platform, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, settingsStorage: SettingsStorage, api: Api) {
    platform.ready().then(() => {
      this.api = api;
      this.settingsStorage = settingsStorage;
      this.settingsStorage.isReady(() => {
        this.readyToLogin = true;
        this.getSavedUser();
      });
    });
  }
  
  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
	    title: title,
	    subTitle: subTitle,
	    buttons: ['OK']
	  });
	  alert.present();
  }
  
  getSavedUser() {
    this.settingsStorage.getUser((username:string, password:string) => {
      this.username = username;
      this.password = password;
    });
  }
  
  save() {
    if(this.username == null || this.username == "" || this.password == null || this.password == "") {
      this.showAlert('Empty fields', 'Fill all login inputs');
      return;
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.api.fetch(this.username, this.password, (success:boolean) => {
      loading.dismiss();
      if(success) {
        this.settingsStorage.setUser(this.username, this.password, () => {
          this.showAlert('Save successful!', 'Login details have been successfully saved') 
        });
      }
      else {
        this.showAlert('Login failed', 'Invalid credentials or server error');
      }
    });
  }
  
  setAirport() {
    let setAirport = this.modalCtrl.create(SetAirportPage);
    setAirport.present();
  }

  ionViewDidLoad() {
    console.log('Hello SettingsPage Page');
  }
}