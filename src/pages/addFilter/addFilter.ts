import { Component } from '@angular/core';
import { NavController, Platform, ViewController, ModalController, AlertController, Events, LoadingController} from 'ionic-angular';
import { SetAirportPage } from '../../modals/settings-modals/set-airport/set-airport';
import { SetDatesPage } from '../../modals/settings-modals/set-dates/set-dates';
import { Api } from '../../providers/api';
import { SettingsStorage } from '../../providers/settings-storage';

/*
  Generated class for the addFilters page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addFilters',
  templateUrl: 'addFilter.html'
})
export class AddFilterPage {

  private settingsStorage:SettingsStorage;
  private api:Api;
  private previewScheduled:boolean=false;

  public filterName:string;
  public username:string;
  public password:string;

  public report_release_time_range:string;
  public duty_period_time_range:string;
  public pairing_credit_range:string;
  public layover_range:string;

  public footerSegment:string;

  public actualItems:string[] = [];
  public potencialItems:string[] = [];

  private tradesData=false;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,  public modalCtrl: ModalController, public alertCtrl: AlertController, public events: Events, settingsStorage: SettingsStorage, api: Api, platform:Platform, public loadingCtrl:LoadingController) {
    platform.ready().then(() => {
      this.reportReleaseTimeRange();
      this.dutyPeriodTimeRange();
      this.pairingCreditRange();
      this.layoverRange();
      this.footerSegment = "potencial";
      this.api = api;
      this.settingsStorage = settingsStorage;
      this.settingsStorage.isReady(() => {
        this.getSavedUser();
      });
    });
  }

  getSavedUser() {
    this.settingsStorage.getUser((username:string, password:string) => {
      this.username = username;
      this.password = password;
    });
  }

  public items:{} = {
    base: 'CLT',
    days: [],
    deadhead: 'not_required',
    duty: [],
    dutyPeriodTime: { duty_max: '15:00', duty_min: '00:00' },
    flight: { flight_con: true, flight_dates: [], flight_dow: [], flight_num: '' },
    layover: { layover_con: 'yes1', layover_loc: '',  layover_dates: [], layover_dow: [], layover_max: '60:00', layover_min: '04:00', layover_range_checkbox: false},
    legsPerDuty: { dprow_max: 6, dprow_min: 1, dprow_type: 'any' },
    operates: { operates_from: '2017-01-31', operates_from_hm: '00:00', operates_to: '2017-03-01', operates_to_hm: '23:59' },
    pairingCredit: { tcr_max: '35:00', tcr_min: '05:00' },
    position: ['LFA'],
    releaseBetween: { llr_max: '24:00', llr_min: '00:00' },
    reportBetween: { flr_max: '24:00', flr_min: '00:00' },
    report_dow: [],
    trip_type: 'drop',
    last_departure_airport: ''};

  getItem(item: string, object: string) : any {
    if(this.items.hasOwnProperty(item))
      return this.items[item][object];
    else
      return undefined;
  }

  reportReleaseTimeRange() {
    this.report_release_time_range = "0";
    for(let i = 1; i < 24; i++) {
      this.report_release_time_range += "," + i;
    }
  }

  dutyPeriodTimeRange() {
    this.duty_period_time_range = "0";
    for(let i = 1; i < 15; i++) {
      this.duty_period_time_range += "," + i;
    }
  }

  pairingCreditRange() {
    this.pairing_credit_range = "5";
    for(let i = 6; i < 35; i++) {
      this.pairing_credit_range += "," + i;
    }
  }

  layoverRange() {
    this.layover_range = "4";
    for(let i = 5; i < 60; i++) {
      this.layover_range += "," + i;
    }
  }

  showSetDates(date_object) {
    let setDates = this.modalCtrl.create(SetDatesPage, { dates: date_object });
    setDates.onDidDismiss(dates => {
      date_object = dates;
      this.filterChange();
    });
    setDates.present();
    console.log(this.items);
  }

  // submit() {
  //   let loading = this.loadingCtrl.create({
  //       content:'Retrieving results for this filter, please wait'
  //   });
  //   loading.present();
  //   this.api.fetch(this.username, this.password, (data) => {
  //       loading.dismiss();
  //       var message='';
  //       for(var trade in data['trades_to_add']) {
  //            message=message+'<br>'+data['trades_to_add'][trade]['title'];
  //       }
  //       let confirm = this.alertCtrl.create({
  //           title: 'Filter Results',
  //           message: message,
  //           buttons: [
  //           {
  //               text: 'Back',
  //               handler: () => {
  //                   return;
  //               }
  //           },
  //           {
  //               text: 'Save and Exit',
  //               handler: () => {
  //                   this.save();
  //               }
  //           }]
  //       });
  //       confirm.present();
  //   });
  // }

  save() {
    this.api.fetchSinglePairing(this.items, (response) => {
      var pairings = response['pairings'];
      //normalize pairings
      var pairingsId=[];
      for(var index in pairings) {
        var id=pairings[index]['pairing_id'];
        if(pairings.indexOf(id) > -1) {
            continue;
        }
        pairingsId.push(id);
      }
      this.events.publish('filter:created', this.items, this.filterName, pairingsId, this.tradesData);
      this.viewCtrl.dismiss(this.items);
    });
  }

  filterChange() {
    if(this.previewScheduled)
    {
      setTimeout(() => {
        this.filterChange();
      }, 1000);
      return;
    }
    this.previewScheduled = true;
    this.refresh();
  }

  refresh() {
    this.api.fetchSinglePairing(this.items, (actualData) => {
      this.potencialItems = [];
      this.actualItems = actualData['pairings'];
      this.api.fetch(this.username, this.password, (potencialData) => {
        this.tradesData = potencialData['trades_to_add'];
        this.previewScheduled = false;
        for(var pairing in actualData['pairings']) {
          for(var trade in potencialData['trades_to_add']) {
            if(potencialData['trades_to_add'][trade]['pairing'] == actualData['pairings'][pairing]['pairing_id'])
            {
              this.potencialItems.push(potencialData['trades_to_add'][trade]);
            }
          }
        }
      });
    });
  }
}
