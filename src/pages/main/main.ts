import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { SetOperatesPage } from './basicSettingsModals/set-operates/set-operates';
import { ExcludePositionsPage } from './basicSettingsModals/exclude-positions/exclude-positions';

/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  settingsPage = SettingsPage;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  }

  showOperatesSettings() {
    let setOperates = this.modalCtrl.create(SetOperatesPage);
    setOperates.present();
  }

  showExcludePositionsSettings() {
    let excludePositions = this.modalCtrl.create(ExcludePositionsPage);
    excludePositions.present();
  }

  ionViewDidLoad() {
    console.log('Hello MainPage Page');
  }
}
