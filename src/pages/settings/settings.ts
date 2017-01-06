import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SetLoginDetailsPage } from '../../modals/settings-modals/set-login-details/set-login-details';

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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,) {

  }

  showSetLoginDetails() {
    let setLoginDetails = this.modalCtrl.create(SetLoginDetailsPage);
    setLoginDetails.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
}
