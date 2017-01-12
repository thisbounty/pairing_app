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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,  public modalCtrl: ModalController, public alertCtrl: AlertController, public events: Events) {
  }

  showSetAirports() {
    //setAirports.instance to get
    let setAirports = this.modalCtrl.create(SetAirportPage);
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
                     this.events.publish('filter:created', "Base filter", { base: data });
                     console.log('Set base checkbox data:', data); //array
                 }} ]
    });
    alert.present();
  }

  showOperatesSettings() {
    let setOperates = this.modalCtrl.create(SetOperatesPage);
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
                     this.events.publish('filter:created', "Exclude positions filter", { base: data });
                     console.log('Trip type checkbox data:', data); //array
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
                       this.events.publish('filter:created', "Report date filter", { base: data });
                       console.log('Report date checkbox data:', data); //array
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
                     this.events.publish('filter:created', "Number of calendar days filter", { base: data });
                     console.log('Number of calendar days data:', data); //array
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
                     this.events.publish('filter:created', "Duty period number filter", { base: data });
                     console.log('Duty period number data:', data); //array
                 }} ]
    })
    alert.present();
  }

  showDutyPeriodTime() {
    let dutyPeriodTime = this.modalCtrl.create(DutyPeriodTimePage)
    dutyPeriodTime.present();
  }

  showPairingCredit() {
    let pairingCredit = this.modalCtrl.create(PairingCreditPage)
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
                     this.events.publish('filter:created', "Trip type filter", { base: data });
                     console.log('Trip type radio data:', data); //array
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
                     this.events.publish('filter:created', "Deadhead filter", { base: data });
                     console.log('Deadhead radio data:', data); //array
                 }} ]
    })
    alert.present();
  }

  showLayoverSettings() {
    let layoverSettings = this.modalCtrl.create(LayoverPage);
    layoverSettings.present();
  }

  showFlightSettings() {
    let flightSettings = this.modalCtrl.create(FlightPage)
    flightSettings.present();
  }

  showReportBetween() {
    let reportBetween = this.modalCtrl.create(ReportBetweenPage);
    reportBetween.present();
  }

  showReleaseBetween() {
    let releaseBetween = this.modalCtrl.create(ReleaseBetweenPage);
    releaseBetween.present();
  }

  showLegsPerDuty() {
    let legsPerDuty = this.modalCtrl.create(LegsPerDutyPage);
    legsPerDuty.present();
  }

  showExcludeEquipment() {
    let alert = this.alertCtrl.create({
      title: 'Exclude equipment',
      inputs: [ { type: 'checkbox', label: 'B757-EW', value: '>b757-ew' },
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
                     this.events.publish('filter:created', "Duty period number filter", { base: data });
                     console.log('Duty period number data:', data); //array
                 }} ]
    })
    alert.present();
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
