import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the ExcludeEquipment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-exclude-equipment',
  templateUrl: 'exclude-equipment.html'
})
export class ExcludeEquipmentPage {

  constructor(private viewCtrl: ViewController) {}

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
