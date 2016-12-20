import { Component } from '@angular/core';
import { ViewController, Platform } from 'ionic-angular';
import { SettingsStorage } from '../../../providers/settings-storage';

/*
  Generated class for the SetAirportByName page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'set-airport.html'
})
export class SetAirportPage {

  private settingsStorage:SettingsStorage;
  public airportName:string = '';
  public selectedAirport:string = '';
  airlines: any;

  constructor(private viewCtrl: ViewController, platform:Platform, settingsStorage: SettingsStorage) {
    platform.ready().then(() => {
      this.settingsStorage = settingsStorage;
      this.settingsStorage.isReady(() => {
        this.getSavedAirport();
      });
    });
  }

  initializeItems() {
    this.airlines = SettingsStorage.airlines;
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  
  getAirports() {
    let val = this.airportName;
    if(val.length >= 1) {
      this.initializeItems();
      if (val && val.trim() != '') {
        this.airlines = this.airlines.filter((airline) => {
          if(airline.name != null)
            return (airline.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || airline.iata.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    else {
      this.airlines = [];
    }
  }
  saveAirport(airline) {
    this.settingsStorage.saveAirport(airline.name, airline.iata);
  }
  
  getSavedAirport() {
    this.settingsStorage.getAirport((airportName:string, iata:string) => {
      this.airportName = airportName;
      this.getAirports();
    });
  }
}
