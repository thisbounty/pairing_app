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
import { SettingsPage } from "../settings/settings";

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
  private pollErrorCounter;
  private lastSync;
  private pollingStatus:boolean; //used for turning off polling from the outside, like adding a filter
  private currentlyPolling:boolean;
  private stopExistingPoll:boolean;

  constructor(platform:Platform, public navCtrl: NavController, api: Api, private settingsStrg: SettingsStorage, private backgroundTsk: BackgroundTask, public events: Events) {
    this.pollErrorCounter=0;
    this.settingsStorage = settingsStrg;
    this.api = api;
    this.backgroundTask = backgroundTsk;
    this.pollingStatus = true;
    this.stopExistingPoll = false;

    this.events.subscribe('polling:status', (value) => {
      console.log('Changing polling status to '+value);
      this.pollingStatus=value;
      //need override to stop existing poll. Poll could have started
      console.log('Stopping any existing polling '+value);
      this.stopExistingPoll= true;
    });

    platform.ready().then(() => {
      //Enable backgroudn mode and start polling api every 5 minutes
      BackgroundMode.setDefaults({
        title: 'Pairing App',
        text: 'We are still in the background!'
      })
      BackgroundMode.enable();
      let current = this;
      this.backgroundTask.startBackgroundJob(() => {
        if(!this.pollingStatus) {
          console.log('skip polling, first');
          //skip, used to prevent race conditions, like when adding a filter
          return;
        }
        if(this.currentlyPolling) {
          console.log('skip polling, current poll running');
          return;
        }
        // stop polling until this one is done, to prevent race conditions
        this.currentlyPolling = true;
        current.settingsStorage.getFilters(
            (filters:Array<{name: string, created: string, data: any, pairings: any, id: any, trades: any}>) => {
               this.tradeUpdate(current, filters, events);
        });
      }, 60000);
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
    /*this.settingsStorage.getUser((username:string, password:string) => {
      if(current.username == '' || current.password == '') {
        this.pollErrorCounter=this.pollErrorCounter+1;
        console.log(this.pollErrorCounter);
        if(this.pollErrorCounter>4) {
          this.navCtrl.push(SettingsPage);
        }
        return;
      }

      this.pollErrorCounter=0;

      if(filters.length < 1) {
        return;
      }*/
    console.log("Loaded filters, waiting response");
      current.api.trades(filters,'', '', current.lastSync).then(function(updatedFilters){
              current.lastSync = + new Date();
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
              //avoids race conditions, only one polling at a time
              current.currentlyPolling = false;
              console.log('Polling status is ');
              console.log(current.pollingStatus);
              if(!current.pollingStatus) {
                console.log('skip polling second');
                //check race condition here too. May be long wait for api in between poll start and request, long enough to create a new filter
                return;
              }
              console.log('Stop existing polling is '+current.stopExistingPoll);
              if(current.stopExistingPoll) {
                 console.log('skip polling, stopExistingPoll');
                 current.stopExistingPoll = false;
                 return;
              }
              events.publish('functionCall:apiPairings', updatedFilters);
          });
  //  });
  }

  navFiltering() {
    console.log('navFilter');
    this.navCtrl.push(FilteringPage);
  }

  navPassword() {
    console.log('navPassword');
    this.navCtrl.push(SettingsPage);
  }

}
