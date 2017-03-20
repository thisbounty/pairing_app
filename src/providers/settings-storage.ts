import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SecureStorage } from 'ionic-native';
import 'rxjs/add/operator/map';
import { Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  private storage:Storage;

  constructor(platform:Platform, http: Http, alertCtrl: AlertController, storage:Storage) {
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
      this.storage=storage;
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
    this.storage.ready().then(() => {
        this.storage.set('filters', filters);
    });
  }

  getFilters(callback:Function) {
    this.storage.ready().then(() => {
        this.storage.get('filters').then((val) => {
        if(typeof(val) === 'undefined' || val == null) {
             val=[];
        }
        callback(val);
        });
    });
  }
}
