import { Component } from '@angular/core';
import { ViewController, Events, NavParams } from 'ionic-angular';

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

  public operates_from:string = "2017-01-31";
  public operates_from_hm:string = "00:00";
  public operates_to:string = "2017-03-01";
  public operates_to_hm:string = "23:59";

  constructor(params: NavParams, private viewCtrl: ViewController, public events: Events) {
    if(params.get('operates_from'))
      this.operates_from = params.get('operates_from');
    if(params.get('operates_from_hm'))
      this.operates_from_hm = params.get('operates_from_hm');
    if(params.get('operates_to'))
      this.operates_to = params.get('operates_to');
    if(params.get('operates_to_hm'))
      this.operates_to_hm = params.get('operates_to_hm');
  }

  save() {
    this.viewCtrl.dismiss({ operates_from: this.operates_from, operates_from_hm: this.operates_from_hm, operates_to: this.operates_to, operates_to_hm: this.operates_to_hm});
  }
}
