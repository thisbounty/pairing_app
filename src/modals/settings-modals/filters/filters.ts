import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, AlertController, Events} from 'ionic-angular';
import { SetAirportPage } from '../set-airport/set-airport';
import { SetOperatesPage } from '../set-operates/set-operates';
import { DutyPeriodTimePage } from '../duty-period-time/duty-period-time';
import { PairingCreditPage } from '../pairing-credit/pairing-credit';
import { LayoverPage } from '../layover/layover';
import { FlightPage } from '../flight/flight';
import { ReportBetweenPage } from '../report-between/report-between';
import { ReleaseBetweenPage } from '../release-between/release-between';
import { LegsPerDutyPage } from '../legs-per-duty/legs-per-duty';
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

  public items:{} = {};

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,  public modalCtrl: ModalController, public alertCtrl: AlertController, public events: Events) {
  }

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
      inputs: [ { type: 'radio', label: 'PHX', value: 'phx' },
                { type: 'radio', label: 'PHL', value: 'phl' },
                { type: 'radio', label: 'DCA', value: 'dca' },
                { type: 'radio', label: 'CLT', value: 'clt' } ],
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
      inputs: [ { type: 'checkbox', label: 'AFA | Lead Flight Attendant', value: 'afa' },
                { type: 'checkbox', label: 'BFA', value: 'bfa' },
                { type: 'checkbox', label: 'CFA', value: 'cfa' },
                { type: 'checkbox', label: 'DFA', value: 'dfa' },
                { type: 'checkbox', label: 'EFA', value: 'efa' },
                { type: 'checkbox', label: 'GFA', value: 'gfa' },
                { type: 'checkbox', label: 'HFA', value: 'hfa' },
                { type: 'checkbox', label: 'IFA', value: 'ifa' },
                { type: 'checkbox', label: 'JFA', value: 'jfa' },
                { type: 'checkbox', label: 'KFA', value: 'kfa' },
                { type: 'checkbox', label: 'LFA', value: 'lfa' } ],
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
      inputs: [ { type: 'radio', label: 'Drop', value: 'drop' },
                { type: 'radio', label: 'Trade', value: 'trade' },
                { type: 'radio', label: 'Drop and Trade', value: 'both' } ],
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
      inputs: [ { type: 'radio', label: 'Not required', value: 'not_required' },
                { type: 'radio', label: 'Exists on First Leg', value: 'exists_on_first_leg' },
                { type: 'radio', label: 'Exists on Last Leg', value: 'exists_on_last_leg' },
                { type: 'radio', label: 'Exists on Any Leg', value: 'exists_on_any_leg' } ],
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
      inputs: [ { type: 'checkbox', label: 'B757-EW', value: 'b757-ew' },
                { type: 'checkbox', label: 'B757-HW', value: 'b757-hw' },
                { type: 'checkbox', label: 'A330-300', value: 'a330-300' },
                { type: 'checkbox', label: 'A321-L', value: 'a321-l' },
                { type: 'checkbox', label: 'A319-L', value: 'a319-l' },
                { type: 'checkbox', label: 'A319-W', value: 'a319-w' },
                { type: 'checkbox', label: 'E190-L', value: 'e190-l' },
                { type: 'checkbox', label: 'A330-200', value: 'a330-200' },
                { type: 'checkbox', label: 'A320-W', value: 'a320-w' },
                { type: 'checkbox', label: 'A320-O', value: 'a320-o' } ],
      buttons: [ { text: 'Cancel', role: 'cancel' },
                 { text: 'Okay',
                   handler: data => {
                     this.items["equipment"] = data;
                 }} ]
    })
    alert.present();
  }

  save() {
    this.events.publish('filter:created', this.items);
    this.viewCtrl.dismiss(this.items);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
