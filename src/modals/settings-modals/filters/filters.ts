import { Component } from '@angular/core';
import { NavController, Platform, ViewController, ModalController, AlertController, Events, LoadingController} from 'ionic-angular';
import { SetAirportPage } from '../set-airport/set-airport';
import { SetOperatesPage } from '../set-operates/set-operates';
import { DutyPeriodTimePage } from '../duty-period-time/duty-period-time';
import { PairingCreditPage } from '../pairing-credit/pairing-credit';
import { LayoverPage } from '../layover/layover';
import { FlightPage } from '../flight/flight';
import { ReportBetweenPage } from '../report-between/report-between';
import { ReleaseBetweenPage } from '../release-between/release-between';
import { LegsPerDutyPage } from '../legs-per-duty/legs-per-duty';
import { Api } from '../../../providers/api';
import { SettingsStorage } from '../../../providers/settings-storage';

/*
  Generated class for the Filters page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html'
})
export class FiltersPage {

  private settingsStorage:SettingsStorage;
  private api:Api;
  public username:string;
  public password:string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,  public modalCtrl: ModalController, public alertCtrl: AlertController, public events: Events, settingsStorage: SettingsStorage, api: Api, platform:Platform, public loadingCtrl:LoadingController) {
    platform.ready().then(() => {
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
    deadhead: '',
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
    trip_type: 'drop'};

  getItem(item: string, object: string) : any {
    if(this.items.hasOwnProperty(item))
      return this.items[item][object];
    else
      return undefined;
  }

  showSetAirports() {
    let setAirports = this.modalCtrl.create(SetAirportPage, { airportName: this.getItem('airport','airportName'), iata: this.getItem('airport', 'iata') });
    setAirports.onDidDismiss(data => {
      this.items['airport'] = data;
    });
    setAirports.present();
  }

  showBaseSettings() {
    let alert = this.alertCtrl.create({
      title: 'Set base',
      inputs: [ { type: 'radio', label: 'PHX', value: 'PHX', checked: true },
                { type: 'radio', label: 'PHL', value: 'PHL' },
                { type: 'radio', label: 'DCA', value: 'DCA' },
                { type: 'radio', label: 'CLT', value: 'CLT' } ],
      buttons: [ { text: 'Cancel', role: 'cancel' },
                 { text: 'Okay',
                   handler: data => {
                     this.items["base"] = data;
                 }} ]
    });
    alert.present();
  }

  showOperatesSettings() {
    let setOperates = this.modalCtrl.create(SetOperatesPage, { operates_from: this.getItem('operates','operates_from'), operates_from_hm: this.getItem('operates','operates_from_hm'), operates_to: this.getItem('operates','operates_to'), operates_to_hm: this.getItem('operates','operates_to_hm') });
    setOperates.onDidDismiss(data => {
      this.items['operates'] = data;
    });
    setOperates.present();
  }

  showExcludePositionsSettings() {
    let alert = this.alertCtrl.create({
      title: 'Exclude positions',
      inputs: [ { type: 'checkbox', label: 'AFA', value: 'AFA' },
                { type: 'checkbox', label: 'BFA', value: 'BFA' },
                { type: 'checkbox', label: 'CFA', value: 'CFA' },
                { type: 'checkbox', label: 'DFA', value: 'DFA' },
                { type: 'checkbox', label: 'EFA', value: 'EFA' },
                { type: 'checkbox', label: 'GFA', value: 'GFA' },
                { type: 'checkbox', label: 'HFA', value: 'HFA' },
                { type: 'checkbox', label: 'IFA', value: 'IFA' },
                { type: 'checkbox', label: 'JFA', value: 'JFA' },
                { type: 'checkbox', label: 'KFA', value: 'KFA' },
                { type: 'checkbox', label: 'LFA', value: 'LFA' } ],
      buttons: [ { text: 'Cancel', role: 'cancel' },
                 { text: 'Okay',
                   handler: data => {
                     this.items["position"] = data;
                 }} ]
    });
    alert.present();
  }

  showReportDate() {
      let alert = this.alertCtrl.create({
        title: 'Report date',
        inputs: [ { type: 'checkbox', label: 'Monday', value: 'monday' },
                  { type: 'checkbox', label: 'Tuesday', value: 'tuesday' },
                  { type: 'checkbox', label: 'Wednesday', value: 'wednesday' },
                  { type: 'checkbox', label: 'Thursday', value: 'thursday' },
                  { type: 'checkbox', label: 'Friday', value: 'friday' },
                  { type: 'checkbox', label: 'Saturday', value: 'saturday' },
                  { type: 'checkbox', label: 'Sunday', value: 'sunday' } ],
        buttons: [ { text: 'Cancel', role: 'cancel' },
                   { text: 'Okay',
                     handler: data => {
                       this.items["report_dow"] = data;
                   }} ]
      });
      alert.present();
  }

  showNumberOfCalendarDays() {
    let alert = this.alertCtrl.create({
      title: 'Number of calendar days',
      inputs: [ { type: 'checkbox', label: '1', value: '1' },
                { type: 'checkbox', label: '2', value: '2' },
                { type: 'checkbox', label: '3', value: '3' },
                { type: 'checkbox', label: '4', value: '4' },
                { type: 'checkbox', label: '5', value: '5' },
                { type: 'checkbox', label: '6', value: '6' },
                { type: 'checkbox', label: '7', value: '7' } ],
      buttons: [ { text: 'Cancel', role: 'cancel' },
                 { text: 'Okay',
                   handler: data => {
                     this.items["days"] = data;
                 }} ]
    });
    alert.present();
  }

  showDutyPeriodNumber() {
    let alert = this.alertCtrl.create({
      title: 'Duty period number',
      inputs: [ { type: 'checkbox', label: '1', value: '1' },
                { type: 'checkbox', label: '2', value: '2' },
                { type: 'checkbox', label: '3', value: '3' },
                { type: 'checkbox', label: '4', value: '4' },
                { type: 'checkbox', label: '5', value: '5' },
                { type: 'checkbox', label: '6', value: '6' },
                { type: 'checkbox', label: '7', value: '7' } ],
      buttons: [ { text: 'Cancel', role: 'cancel' },
                 { text: 'Okay',
                   handler: data => {
                     this.items["duty"] = data;
                 }} ]
    })
    alert.present();
  }

  showDutyPeriodTime() {
    let dutyPeriodTime = this.modalCtrl.create(DutyPeriodTimePage, { duty_min: this.getItem('dutyPeriodTime','duty_min'), duty_max: this.getItem('dutyPeriodTime','duty_max') })
    dutyPeriodTime.onDidDismiss(data => {
      this.items['dutyPeriodTime'] = data;
    });
    dutyPeriodTime.present();
  }

  showPairingCredit() {
    let pairingCredit = this.modalCtrl.create(PairingCreditPage, { tcr_min: this.getItem('pairingCredit','tcr_min'), tcr_max: this.getItem('pairingCredit','tcr_max') })
    pairingCredit.onDidDismiss(data => {
      this.items['pairingCredit'] = data;
    });
    pairingCredit.present();
  }

  showTripType() {
    let alert = this.alertCtrl.create({
      title: 'Trip type',
      inputs: [ { type: 'radio', label: 'Drop', value: 'drop', checked: true },
                { type: 'radio', label: 'Trade', value: 'trade' },
                { type: 'radio', label: 'Drop and Trade', value: 'drop_trade' } ],
      buttons: [ { text: 'Cancel', role: 'cancel' },
                 { text: 'Okay',
                   handler: data => {
                     this.items["trip_type"] = data;
                 }} ]
    })
    alert.present();
  }

  showDeadhead() {
    let alert = this.alertCtrl.create({
      title: 'Set deadhead',
      inputs: [ { type: 'radio', label: 'Not required', value: 'not_required', checked: true },
                { type: 'radio', label: 'Exists on First Leg', value: 'first' },
                { type: 'radio', label: 'Exists on Last Leg', value: 'last' },
                { type: 'radio', label: 'Exists on Any Leg', value: 'any' } ],
      buttons: [ { text: 'Cancel', role: 'cancel' },
                 { text: 'Okay',
                   handler: data => {
                     this.items["deadhead"] = data;
                 }} ]
    })
    alert.present();
  }

  showLayoverSettings() {
    let layoverSettings = this.modalCtrl.create(LayoverPage, { layover_con: this.getItem('layover','layover_con'), layover_dates: this.getItem('layover','layover_dates'), layover_dow: this.getItem('layover','layover_dow'), layover_range_checkbox: this.getItem('layover','layover_range_checkbox'), layover_min: this.getItem('layover','layover_min'), layover_max: this.getItem('layover','layover_max') });
    layoverSettings.onDidDismiss(data => {
      this.items['layover'] = data;
    });
    layoverSettings.present();
  }

  showFlightSettings() {
    let flightSettings = this.modalCtrl.create(FlightPage, { layover_con: this.getItem('flight','flight_con'), flight_num: this.getItem('flight','flight_num'), flight_dow: this.getItem('flight','flight_dow'), flight_dates: this.getItem('flight','flight_dates') })
    flightSettings.onDidDismiss(data => {
      this.items['flight'] = data;
    });
    flightSettings.present();
  }

  showReportBetween() {
    let reportBetween = this.modalCtrl.create(ReportBetweenPage, { flr_min: this.getItem('reportBetween','flr_min'), flr_max: this.getItem('reportBetween','flr_max')});
    reportBetween.onDidDismiss(data => {
      this.items['reportBetween'] = data;
    });
    reportBetween.present();
  }

  showReleaseBetween() {
    let releaseBetween = this.modalCtrl.create(ReleaseBetweenPage, { llr_min: this.getItem('releaseBetween','llr_min'), llr_max: this.getItem('releaseBetween','llr_max')} );
    releaseBetween.onDidDismiss(data => {
      this.items['releaseBetween'] = data;
    });
    releaseBetween.present();
  }

  showLegsPerDuty() {
    let legsPerDuty = this.modalCtrl.create(LegsPerDutyPage, { dprow_min: this.getItem('legsPerDuty','dprow_min'), dprow_max: this.getItem('legsPerDuty','dprow_max'), dprow_type: this.getItem('legsPerDuty','dprow_type') });
    legsPerDuty.onDidDismiss(data => {
      this.items['legsPerDuty'] = data;
    });
    legsPerDuty.present();
  }

  showExcludeEquipment() {
    let alert = this.alertCtrl.create({
      title: 'Exclude equipment',
      inputs: [ { type: 'checkbox', label: 'B757-EW', value: '5E' },
                { type: 'checkbox', label: 'B757-HW', value: '5H' },
                { type: 'checkbox', label: 'A330-300', value: '33' },
                { type: 'checkbox', label: 'A321-L', value: '21' },
                { type: 'checkbox', label: 'A319-L', value: '19' },
                { type: 'checkbox', label: 'A319-W', value: '9W' },
                { type: 'checkbox', label: 'E190-L', value: '90' },
                { type: 'checkbox', label: 'A330-200', value: '32' },
                { type: 'checkbox', label: 'A320-W', value: '20' },
                { type: 'checkbox', label: 'A320-O', value: '05' } ],
      buttons: [ { text: 'Cancel', role: 'cancel' },
                 { text: 'Okay',
                   handler: data => {
                     this.items["equipment"] = data;
                 }} ]
    })
    alert.present();
  }

  submit() {
    let loading = this.loadingCtrl.create({
        content:'Retrieving results for this filter, please wait'
    });
    loading.present();
    this.api.fetch(this.username, this.password, (data) => {
        loading.dismiss();
        var message='';
        for(var trade in data['trades_to_add']) {
             message=message+'<br>'+data['trades_to_add'][trade]['title'];
        }
        let confirm = this.alertCtrl.create({
            title: 'Filter Results',
            message: message,
            buttons: [
            {
                text: 'Back',
                handler: () => {
                    return;
                }
            },
            {
                text: 'Save and Exit',
                handler: () => {
                    this.save();
                }
            }]
        });
        confirm.present();
    });
  }

  save() {
    this.events.publish('filter:created', this.items);
    this.viewCtrl.dismiss(this.items);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
