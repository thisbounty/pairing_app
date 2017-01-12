import { Component } from '@angular/core';
import { ViewController, Events } from 'ionic-angular';

/*
  Generated class for the SetOperates page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-set-operates',
  templateUrl: 'set-operates.html'
})
export class SetOperatesPage {

  operates_date:string;
  operates_time:string;
  until_date:string;
  until_time:string;

  constructor(private viewCtrl: ViewController, public events: Events) {
  }

  save() {
    this.events.publish('filter:created', "Set operates filter", { operates_date: this.operates_date, operates_time: this.operates_time,
                                                                    until_date: this.until_date, until_time: this.until_time});
    this.viewCtrl.dismiss();
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
