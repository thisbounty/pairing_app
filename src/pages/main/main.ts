import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//Providers
import { Api } from '../../providers/api';
import { SettingsStorage } from '../../providers/settings-storage';
import { BackgroundTask } from '../../providers/background-task';

import { BackgroundMode } from 'ionic-native';

import { Events } from 'ionic-angular';
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

  private api:Api;
  private settingsStorage:SettingsStorage;
  private backgroundTask:BackgroundTask;

  constructor(platform:Platform, public navCtrl: NavController, api: Api, private settingsStrg: SettingsStorage, private backgroundTsk: BackgroundTask, public events: Events) {
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
        var pairings={'test':['a','b','c']};
        events.publish('functionCall:apiPairings', pairings);
        current.settingsStorage.getFilters((filters:Array<{name: string, created: string, data: any}>) => {
            current.api.fetchPairing(filters).then(function(pairings){
                events.publish('functionCall:apiPairings', pairings);
            });
        })
      }, 30000);
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
