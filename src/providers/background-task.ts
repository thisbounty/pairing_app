import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
Generated class for the BackgroundTask provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BackgroundTask {

  private timeoutTask:any = null;

  constructor() {
    console.log('Hello BackgroundTask Provider');
  }

  startBackgroundJob(callback:Function, delay:number) {
    if(this.timeoutTask == null) {
      this.timeoutTask = setInterval(callback, delay);
    }
  }

  stopBackgroundJob() {
    clearInterval(this.timeoutTask);
    this.timeoutTask = null;
  }

}
