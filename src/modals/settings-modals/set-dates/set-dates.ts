import { Component } from '@angular/core';
import { ViewController, ActionSheetController  } from 'ionic-angular';
import { DateUtils } from '../../../providers/date-utils';

/*
  Generated class for the SetDates page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-set-dates',
  templateUrl: 'set-dates.html'
})
export class SetDatesPage {

  public dates:Array<{ text: string, value: string }> = [];
  public date:any;

  constructor(public viewCtrl: ViewController, private actionSheetCtrl: ActionSheetController) {
  }

  buttonClicked(index) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Date',
      buttons: [
        {
          text: 'Delete',
          role: 'delete',
          icon: 'trash',
          handler: () => {
            this.dates.splice(index, 1);
          }
        }
      ]
    });
    actionSheet.present();
  }

  dateChanged(event: Event) {
    this.dates.unshift(JSON.parse(('{ "text": "' + this.date + '", "value": "' + DateUtils.parseDate(this.date) + '" }')));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
