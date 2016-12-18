import { Injectable } from '@angular/core';
import { SecureStorage } from 'ionic-native';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

/*
  Generated class for the SettingsStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SettingsStorage {

  private secureStorage:SecureStorage;
  public static storeName:string = 'pairing_app';
  public static loginItem:string = 'loginDetails';
  private ready:boolean;

  constructor(platform:Platform) {
    platform.ready().then(() => {
      this.secureStorage = new SecureStorage();
      this.secureStorage.create(SettingsStorage.storeName).then(
        () => {
          console.log('Storage is ready');
        },
        error => console.log(error)
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
}