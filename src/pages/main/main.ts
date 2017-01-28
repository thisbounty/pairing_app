import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FilteringPage } from '../filtering/filtering';
//Providers
import { Api } from '../../providers/api';
import { SettingsStorage } from '../../providers/settings-storage';
import { BackgroundTask } from '../../providers/background-task';

import { BackgroundMode } from 'ionic-native';
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
  private backgroundTask:BackgroundTask;

  constructor(platform:Platform, public navCtrl: NavController, api: Api, private settingsStrg: SettingsStorage, private backgroundTsk: BackgroundTask) {
    this.settingsStorage = settingsStrg;
    this.api = api;
    this.backgroundTask = backgroundTsk;

    platform.ready().then(() => {
      //Enable backgroudn mode and start polling api every 5 minutes
      BackgroundMode.setDefaults({
        title: 'Pairing App',
        text: 'We are still in the background!'
      })
      BackgroundMode.enable();
      let current = this;
      this.backgroundTask.startBackgroundJob(() => {
        current.settingsStorage.getFilters((filters:Array<{name: string, created: string, data: any}>) => {
          current.api.fetchPairing(filters);
        })
      }, 300000);
    });
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
