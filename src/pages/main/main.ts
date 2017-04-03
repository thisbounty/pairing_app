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
            (filters:Array<{name: string, created: string, data: any, pairings: any, id: any, trades: any, lastSync:string}>) => {
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
    this.settingsStorage.getFilters((filters:Array<{name: string, created: string, data: any, pairings: any, id: any, trades: any, lastSync:string}>) => {
      this.api.fetchPairing(filters);
    })
  }

  tradeUpdate(current, filters, events) {
    this.settingsStorage.getUser((username:string, password:string) => {
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
      }
    console.log("Loaded filters, waiting response");
    let validTrades=[];
    let skippedTrades=[];
    current.api.trades(filters,'', '').then(function(updatedFilters){
              for(var index in updatedFilters) {
                  var filter=updatedFilters[index];
                  var filterTrades=[];
                  updatedFilters[index]['trades']=filterTrades;
                  //api response is just added to filter.trade in promise, for easy passback from providers/api
                  //trades are in api.response.trades_to_add
                  var trades =updatedFilters[index]['trades_resp']['trades_to_add'];
                  updatedFilters[index]['trades']=false;
                  for(var tradeIndex in trades) {
                      var trade=trades[tradeIndex];
                      if(typeof(filter['data']['trip_type']) === 'undefined'){
                        filter['data']['trip_type'] = '';
                      }
                      if(typeof(filter['data']['position']) === 'undefined'){
                        filter['data']['position'] = '';
                      }
                      if(typeof(filter['data']['operates']['operates_from']) === 'undefined'){
                        filter['data']['operates']['operates_from'] = '';
                      }
                      if(typeof(filter['data']['operates']['operates_to']) === 'undefined'){
                        filter['data']['operates']['operates_to'] = '';
                      }
                      if(typeof(trade['trade']) === 'undefined' || trade['trade'] == null){
                        trade['trade'] = '';
                      }
                      if(typeof(trade['pairing']) === 'undefined' || trade['pairing'] == null){
                        trade['pairing'] = '';
                      }
                      if(typeof(trade['pos']) === 'undefined' || trade['pos'] == null){
                        //magic number here. 'position' in filter is an array of LATAs to exclude
                        trade['pos'] = 'Not Available';
                      }
                      if(typeof(trade['report']) === 'undefined' || trade['report'] == null){
                        trade['report'] = '';
                      }
                      //console.log(trade);
                      if(typeof(trade['pairing']) === 'undefined' || trade['trade'].toString().toUpperCase() != filter['data']['trip_type'].toString().toUpperCase() ||  filter['data']['position'].indexOf(trade['pos'].toString().toUpperCase()) > -1 || Date.parse(trade['report']) < Date.parse(filter['data']['operates']['operates_from']) || Date.parse(trade['report']) > Date.parse(filter['data']['operates']['operates_to'] )) {
                          //console.log('Skipped trade:');
                          //console.log('pos: '+(trade['pos'].toString().toUpperCase() != filter['data']['position'].toString().toUpperCase()).toString());
                          //console.log('to: '+(Date.parse(trade['report']) > Date.parse(filter['data']['operates']['operates_to'])).toString());
                          //console.log('from: '+ (Date.parse(trade['report']) < Date.parse(filter['data']['operates']['operates_from'])).toString());
                          //console.log('trade: '+(trade['trade'].toString().toUpperCase() != filter['data']['trip_type'].toString().toUpperCase()).toString());
                          skippedTrades.push(trade);
                          continue;
                      }
                      //loop filter.pairings, add trade if match
                      // "trade", "pos", "report', and "pairing"
                      //{"ron": null, "title": "Trade 7-10 days for later i year", "pairing": null, "days": null, "trade": "Trade", "credit": null, "trade_id": 601298, "base": "CLT", "pos": null, "report": "04/04/17"
                      for(var pairingIndex in filter['pairings']) {
                          var pairing=filter['pairings'][pairingIndex];
                          if(pairing == trade['pairing'] && filterTrades.indexOf(trade) == -1) {
                              console.log('-- Valid Trade --');
                              filterTrades.push(trade);
                              validTrades.push(trade);
                          }
                      }
                  } //end loop for api.trades
                  updatedFilters[index]['trades']=filterTrades;
              } // end loop for filters
              //avoids race conditions, only one polling at a time
              current.currentlyPolling = false;
              //console.log('Polling status is ');
              //console.log(current.pollingStatus);
              if(!current.pollingStatus) {
                //console.log('skip polling second');
                //check race condition here too. May be long wait for api in between poll start and request, long enough to create a new filter
                return;
              }
              //console.log('Stop existing polling is '+current.stopExistingPoll);
              if(current.stopExistingPoll) {
                 // console.log('skip polling, stopExistingPoll');
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
