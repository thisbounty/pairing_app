import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-exclude-positions',
  templateUrl: 'exclude-positions.html'
})
export class ExcludePositionsPage {

  constructor(private viewCtrl: ViewController) {
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
