import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FilteringPage } from '../filtering/filtering';
import { Api } from '../../providers/api';
import { SettingsStorage } from '../../providers/settings-storage';

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

  filteringPage = FilteringPage;
  private api:Api;
  private settingsStorage:SettingsStorage;

  constructor(public navCtrl: NavController, api: Api, private settingsStrg: SettingsStorage) {
    this.settingsStorage = settingsStrg;
    this.api = api;
  }

  ionViewDidLoad() {
    console.log('Hello MainPage Page');
  }

  refresh() {
    this.settingsStorage.getFilters((filters:Array<{name: string, created: string, data: any}>) => {
      this.api.fetchPairing(filters);
    })
  }
}
