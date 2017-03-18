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
        var filtersStub=[];
        filtersStub.push({name:'test', created:'03-16-2017', data:{base:'clt'}, pairings:[21043,21012, 51565], id:1});
        filtersStub.push({name:'test', created:'03-17-2017', data:{base:'clt'}, pairings:[13086, 51213,13053], id:2});
        var filters=filtersStub;
        current.api.trades(filters).then(function(updatedFilters){
            for(var index in updatedFilters) {
                var filter=updatedFilters[index];
                var filterTrades=[];
                //api response is just added to filter.trade in promise, for easy passback from providers/api
                //trades are in api.response.trades_to_add
                var trades = updatedFilters['trades']['trades_to_add'];
                updatedFilters[index]['trades']=false;
                console.log(trades);
                for(var trade in trades) {
                    if(typeof(trade['pairing']) === 'undefined') {
                        console.log(trade);
                        continue;
                    }
                    //loop filter.pairings, add trade if match
                    for(var pairing in filter['pairings']) {
                        console.log(pairing);
                        console.log(trade['pairing']);
                        if(pairing == trade['pairing']) {
                            filterTrades.push(trade);
                        }
                    }
                    updatedFilters[index]['trades']=filterTrades;
                } //end loop for api.trades
            } // end loop for filters
            console.log(updatedFilters);
            //events.publish('functionCall:apiPairings', res['trades_to_add']);
        });

        current.settingsStorage.getFilters(
            (filters:Array<{name: string, created: string, data: any, pairings: any, id: any, trades: any}>) => {
            current.api.fetchPairing(filters).then(function(res){
                events.publish('functionCall:apiPairings', res['trades_to_add']);
            });
        });
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
