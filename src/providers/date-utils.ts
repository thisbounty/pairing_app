import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

/*
  Generated class for the DateUtils provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DateUtils {

  constructor(public http: Http) {
    console.log('Hello DateUtils Provider');
  }

  //format date to DDMMYYYY
  public static parseDate(inputDate: string) {
    let outputDate:string = moment(inputDate).format("DDMMYYYY");
    return outputDate;
  }
}
