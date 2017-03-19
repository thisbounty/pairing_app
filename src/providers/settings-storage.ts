import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SecureStorage } from 'ionic-native';
import 'rxjs/add/operator/map';
import { Platform, AlertController } from 'ionic-angular';

/*
  Generated class for the SettingsStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SettingsStorage {

  public static airlines:any;
  private secureStorage:SecureStorage;
  public static storeName:string = 'pairing_app';
  public static loginItem:string = 'loginDetails';
  public static filteringItem:string = 'filters';
  public static airportItem:string = 'airport';
  private ready:boolean;

  constructor(platform:Platform, http: Http, alertCtrl: AlertController) {
    platform.ready().then(() => {
      http.get("assets/json/airpoirts_min.json")
        .subscribe(data => {
          SettingsStorage.airlines = data.json();
          console.log("request successful (airport load)");
        }, error => {
          console.log("request failed (airport load)");
      });
      this.secureStorage = new SecureStorage();
      this.secureStorage.create(SettingsStorage.storeName).then(
        () => {
          console.log('Storage is ready');
        },
        error => {
          let alert = alertCtrl.create({
            title: 'Storage error',
            subTitle: (error == "Error: Device is not secure" ? ("Device is not secured. Make sure you have set screen lock. Otherwise application will not work properly.") : (error)),
            buttons: ['Dismiss']
          });
          alert.present();
          console.log(error);
        }
      );
      this.ready = true;
    });
  }

  isReady(callback:Function) {
    if(this.ready) {
      callback();
    } else {
      console.log("Storage is not initialized");
    }
  }

  setUser(username:string, password:string, callback:Function = () => {}) {
    this.secureStorage.set(SettingsStorage.loginItem, JSON.stringify({u:username, p:password}))
    .then(
      data => {
        callback();
      },
      error => console.log(error)
    );
  }

  getUser(callback:Function) {
    this.secureStorage.get(SettingsStorage.loginItem)
    .then(
      data => {
        let {u, p} = JSON.parse(data);
        callback(u,p);
      },
      error => console.log(error)
    );
  }

  saveFilters(filters:Array<{name: string, created: string, data: any, pairings: any, id: any, trades: any}>) {
    var ids = [];
    for(filterIndex in filters) {
        var filter=filters[filterIndex];
        var id=filter['id'];
        //size limitation hit when filter, trade and pairings all lumped together, need multiple keys, and return in getFilters function
        var pairings = filter['pairings'];
        var trades = filter['trade'];
        filter['pairings']=false;
        filter['trade']=false;
        splitFilterSave(filter,pairings,trades);
    }
    this.secureStorage.set(SettingsStorage['filterIds'], JSON.stringify(filter)).then(data => {
       resolveIfCount(resolve, count, 3);
    });
  }

    resolveIfCount(resolve, count, limit) {
        if(count>=limit) {
            resolve();
        }
    }

  splitFilterSave(filter, pairings, trades) {
    return new Promise(resolve, reject) {
      var count=0;
      //save filter
      this.secureStorage.set(SettingsStorage['filter-'+id], JSON.stringify(filter)).then(data => {
        resolveIfCount(resolve, count, 3);
      });
      //save pairing
      this.secureStorage.set(SettingsStorage['pairings-'+id], JSON.stringify(pairings)).then(data => {
        resolveIfCount(resolve, count, 3);
      });
      //save trade
      this.secureStorage.set(SettingsStorage['trades-'+id], JSON.stringify(trades)).then(data => {
        resolveIfCount(resolve, count, 3);
      });
    };
  }

  splitFilterGet()

  getFilters(callback:Function) {
    this.secureStorage.get(SettingsStorage.filteringItem)
    .then(
      data => {
        let filters = JSON.parse(data);
        callback(filters);
      },
      error => console.log(error)
    );
  }
}
