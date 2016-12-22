import { Component } from '@angular/core';
import { ViewController, Platform } from 'ionic-angular';

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

  constructor(private viewCtrl: ViewController) {
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
