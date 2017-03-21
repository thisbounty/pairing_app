import { Component } from '@angular/core';
import { NavController, ViewController, Platform, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Api } from '../../../providers/api';
import { SettingsStorage } from '../../../providers/settings-storage';

@Component({
  selector: 'page-set-login-details',
  templateUrl: 'set-login-details.html'
})
export class SetLoginDetailsPage {

  public username:string;
  public password:string;
  public readyToLogin:boolean;
  private settingsStorage:SettingsStorage;
  private api:Api;

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, platform:Platform, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, settingsStorage: SettingsStorage, api: Api) {
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
    this.api.fetch(this.username, this.password, (data:string) => {
      loading.dismiss();
      if(data) {
        this.settingsStorage.setUser(this.username, this.password, () => {
            this.dismiss();
        });
      }
      else {
        this.showAlert('Login failed', 'Invalid credentials or server error');
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('Hello SettingsPage Page');
  }
}
