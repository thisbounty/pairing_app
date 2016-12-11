import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LocalNotifications } from 'ionic-native';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Api {

  public static fetchUrl:string = 'https://cactus.americanplus.us/fetch';
  
  constructor(public http: Http) {
    console.log('Hello Api Provider');
  }
  
  fetch(username:string, password:string, callback:Function, baseId: string = 'CLT', lastsync:number = 0) {
    this.http.get(Api.fetchUrl + "?userid=" + username +"&password=" + password + "&baseid=" + baseId + "&lastsync=" + lastsync + "")
    .subscribe(data => {
      callback(true);
      LocalNotifications.schedule({
        title: 'Pairing App',
        text: data.json().trades_to_add[0].title
      });
    }, error => {
      callback(false);
      console.log("request failed");
    });
  }
}
