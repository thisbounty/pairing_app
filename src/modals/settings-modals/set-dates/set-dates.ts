import { Component } from '@angular/core';
import { ViewController, ActionSheetController  } from 'ionic-angular';

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

  public dates:any = []; // {text: xxx, value: yyy}
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
    this.dates.unshift(JSON.parse(('{ "text": "' + this.date + '", "value": "' + this.parseDate(event) + '" }')));
  }

  //format date to DDMMYYYY
  parseDate(event: Event) {
    let date:string = "";
    date += event["day"].text;
    if(event["month"].value > 0 && event["month"].value < 10)
      date += "0";
    date += event["month"].value;
    date += event["year"].value;
    return date;
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
