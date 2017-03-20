import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//Providers
import { Api } from '../../providers/api';
import { SettingsStorage } from '../../providers/settings-storage';
import { BackgroundTask } from '../../providers/background-task';
import { BackgroundMode } from 'ionic-native';
import { Events } from 'ionic-angular';

import { FilteringPage } from "../filtering/filtering";
import { AddFilterPage } from "../addFilter/addFilter";

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
  private username:String;
  private password:String;

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
      this.settingsStorage.getUser((username:string, password:string) => {
        this.username=username;
        this.password=password;
      });
      this.backgroundTask.startBackgroundJob(() => {
        current.settingsStorage.getFilters(
            (filters:Array<{name: string, created: string, data: any, pairings: any, id: any, trades: any}>) => {
               this.tradeUpdate(current, filters, events);
        });
      }, 30000);
      current.settingsStorage.getFilters((filters) => {
        if(filters.length > 0) {
          this.navCtrl.push(FilteringPage);
        } else {
          this.navCtrl.push(FilteringPage);
          this.navCtrl.push(AddFilterPage);
        }
      });
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

  tradeUpdate(current, filters, events) {
    var tradeApiCall = current.api.trades(current.username, current.password, filters)
    if(current.username == '' || current.password == '' || typeof(tradeApiCall) == 'undefined') {
       return;
    }
    tradeApiCall.then(function(updatedFilters){
            for(var index in updatedFilters) {
                var filter=updatedFilters[index];
                var filterTrades=[];
                //api response is just added to filter.trade in promise, for easy passback from providers/api
                //trades are in api.response.trades_to_add
                var trades = filter['trades']['trades_to_add'];
                updatedFilters[index]['trades']=false;
                for(var tradeIndex in trades) {
                    var trade=trades[tradeIndex];
                    if(typeof(trade['pairing']) === 'undefined') {
                        continue;
                    }
                    //loop filter.pairings, add trade if match
                    for(var pairingIndex in filter['pairings']) {
                        var pairing=filter['pairings'][pairingIndex];
                        if(pairing == trade['pairing'] && filterTrades.indexOf(trade) == -1) {
                            filterTrades.push(trade);
                        }
                    }
                    updatedFilters[index]['trades']=filterTrades;
                } //end loop for api.trades
            } // end loop for filters
            events.publish('functionCall:apiPairings', updatedFilters);
        });
  }
}
