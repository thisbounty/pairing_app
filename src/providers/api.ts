import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
//import { LocalNotifications } from 'ionic-native';
import { DateUtils } from '../providers/date-utils';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Api {

  public static fetchUrl:string = 'https://cactus.americanplus.us/fetch';
  public static pairingFetchUrl:string = 'https://americanplus.us/process.php';
  public static pairingItems:Array<{ pairing_id: string, data: any }> = [];

  constructor(public http: Http) {
    console.log('Hello Api Provider');
  }

  //old method check if credentials are correct.It could not work anymore.
  fetch(username:string, password:string, callback:Function, baseId: string = 'CLT', lastsync:number = 0) {
    var headers = new Headers();
    headers.append('Authorization', 'Basic '+btoa('AWE:cactus'));
    this.http.get(Api.fetchUrl + "?userid=" + username +"&password=" + password + "&baseid=" + baseId + "&lastsync=" + lastsync + "", {headers:headers})
    .subscribe(data => {
      callback(data.json());
/*      LocalNotifications.schedule({
        title: 'Pairing App',
        text: data.json().trades_to_add[0].title
      });*/
    }, error => {
      callback(error);
      console.log("request failed");
    });
  }

  trades(filters) {
    var current=this;
    return new Promise(function(resolve, reject) {
      var updatedFilters=[];
      filters.forEach(function (filter, index) {
        current.fetch('','',function(resp) {
          filter['trades']=resp;
          updatedFilters.push(filter);
          if(index == filters.length-1) {
             resolve(updatedFilters);
          }
        });
      });
    });
  }

  fetchPairing(filters: any) {
    var current=this;
    return new Promise(function(resolve, reject) {
        //just to know when last response appears
        let responseCount:number = 0;
        let pairingCount:number = 0;
        console.log('filters are ');
        console.log(filters);
        for (let filter of filters) {
          //to return from background task scheduler in main.ts, so notifications can be dispatched, specifically to filter list
          var trade = {};
          trade[filter.name] = [];
          let params = current.parseFilteringParameters(filter['data']);
          let headers = new Headers()
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
          let options:RequestOptionsArgs = {
            headers: headers
          }

          current.http.post(Api.pairingFetchUrl, params, options)
          .subscribe(data => {
            console.log(data);
            for (let pairing of data.json()['pairings']) {
              if(!Api.pairingItems.some(item => item.pairing_id === pairing['pairing_id'])) {
                Api.pairingItems.push({ pairing_id: pairing['pairing_id'], data: pairing['report_date']})
                trade[filter.name].push({ pairing_id: pairing['pairing_id'], data: pairing['report_date']});
                pairingCount++;
              }
            }
            responseCount++;
            console.log(pairingCount+" "+filters.length);
            if(responseCount == filters.length && pairingCount > 0) {
              current.showPairingNotification(pairingCount);
              resolve(trade);
            }
            console.log("succeess");
          }, error => {
            responseCount++;
            if(responseCount == filters.length && pairingCount > 0) {
              current.showPairingNotification(pairingCount);
              resolve(trade);
            }
            console.log("request failed");
          });
        }
    });
  }

  fetchSinglePairing(items: any, callback:Function) {
      let params = this.parseFilteringParameters(items);
      let headers = new Headers()
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
      headers.append('Access-Control-Allow-Origin', '*');
      let options:RequestOptionsArgs = {
        headers: headers
      }

      this.http.post(Api.pairingFetchUrl, params, options)
      .subscribe(data => {
        callback(data.json());
      }, error => {
      });
  }

  showPairingNotification(pairingCount:number) {
    console.log(pairingCount);
/*    LocalNotifications.schedule({
      title: 'Pairing App',
      text: 'New Pairings Found'
    });*/
  }

  parseFilteringParameters(parameters: any, jsonOutput = true) : URLSearchParams {
    let params = new URLSearchParams();
    if(jsonOutput)
      params.append('format', 'json');

    for(let item in parameters) {
      switch(item) {
        case 'airport':
          break;
        case 'trip_type':
          params.append(item, parameters[item]);
          break;
        case 'report_dow':
          params.append(item, parameters[item].toString());
          break;
        case 'reportBetween':
          params.append('flr_max', parameters[item]['flr_max'].replace(':', ''));
          params.append('flr_min', parameters[item]['flr_min'].replace(':', ''));
          break;
        case 'releaseBetween':
          params.append('llr_max', parameters[item]['llr_max'].replace(':', ''));
          params.append('llr_min', parameters[item]['llr_min'].replace(':', ''));
          break;
        case 'position':
          for(let position in parameters[item]) {
            position = parameters[item][position];
            params.append('position[]', position);
          }
          break;
        case 'pairingCredit':
          params.append('tcr_max', parameters[item]['tcr_max'].replace(':', ''));
          params.append('tcr_min', parameters[item]['tcr_min'].replace(':', ''));
          break;
        case 'operates':
          params.append('operates_from', DateUtils.parseDate(parameters[item]['operates_from']));
          params.append('operates_from_hm', parameters[item]['operates_from_hm'].replace(':', ''));
          params.append('operates_to', DateUtils.parseDate(parameters[item]['operates_to']));
          params.append('operates_to_hm', parameters[item]['operates_to_hm'].replace(':', ''));
          break;
        case 'legsPerDuty':
          params.append('dprow_min', parameters[item]['dprow_min']);
          params.append('dprow_max', parameters[item]['dprow_max']);
          params.append('dprow_type', parameters[item]['dprow_type']);
          break;
        case 'layover':
          params.append('layover_con', parameters[item]['layover_con']);
          if(typeof(parameters['airport']) !== undefined)
            params.append('layover_loc', parameters[item]['layover_loc']);

          let layover_dates:string = "";
          for(let date in parameters[item]['layover_dates']) {
            date = parameters[item]['layover_dates'][date].value;
            layover_dates += date;
            if(parameters[item]['layover_dates'][parameters[item]['layover_dates'].length - 1].value != date)
              layover_dates += ",";
          }
          params.append('layover_dates', layover_dates);

          params.append('layover_dow', parameters[item]['layover_dow'].toString());
          if(parameters[item]['layover_range_checkbox']) {
            params.append('layover_range_checkbox', 'yes');
            params.append('layover_min', parameters[item]['layover_min'].replace(':', ''));
            params.append('layover_max', parameters[item]['layover_min'].replace(':', ''));
          }
          else
            params.append('layover_range_checkbox', 'no');
          break;
        case 'flight':
          if(parameters[item]['flight_con'])
            params.append('flight_con', 'yes');
          else
            params.append('flight_con', 'no');

          let flight_dates:string = "";
          for(let date in parameters[item]['flight_dates']) {
            date = parameters[item]['flight_dates'][date].value;
            flight_dates += date;
            if(parameters[item]['flight_dates'][parameters[item]['flight_dates'].length - 1].value != date)
            flight_dates += ",";
          }
          params.append('flight_dates', flight_dates);

          params.append('flight_dow', parameters[item]['flight_dow'].toString());
          params.append('flight_num', parameters[item]['flight_num']);
          break;
        case 'equipment':
          for(let equipment in parameters[item]) {
            equipment = parameters[item][equipment];
            params.append('equipment[]', equipment);
          }
          break;
        case 'dutyPeriodTime':
          params.append('duty_min', parameters[item]['duty_min'].replace(':', ''));
          params.append('duty_max', parameters[item]['duty_max'].replace(':', ''));
          break;
        case 'deadhead':
          params.append(item, parameters[item]);
          break;
        case 'days':
          for(let day in parameters[item]) {
            day = parameters[item][day];
            params.append('days[]', day);
          }
          break;
        case 'base':
          params.append(item, parameters[item]);
          break;
      }
    }
    return params;
  }
}
