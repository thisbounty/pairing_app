import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, Events, ToastController, ActionSheetController } from 'ionic-angular';
import { SettingsStorage } from '../../providers/settings-storage';
import { AddFilterPage } from '../addFilter/addFilter'
import * as moment from 'moment';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filtering',
  templateUrl: 'filtering.html'
})
export class FilteringPage {
  public filters:Array<{name: string, created: string, data: any, pairings: any}> = [];

  public addFilterPage:Component;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController,
              public toastCtrl: ToastController, public events: Events, private settingsStorage: SettingsStorage,
              public actionSheetCtrl: ActionSheetController) {
    this.events.subscribe('filter:created', (data, filterName) => {
      let created = moment().format('YYYY-MM-DD hh:mm A');
      //let name = 'Filter ' + (this.filters.length + 1);
      //console.log({ name: name, created: created, data: data});
      this.filters.push({ name: filterName, created: created, data: data, pairings: false});
      this.filterAddedNotifiaction('New filter');
      //console.log(this.filters);
      this.settingsStorage.saveFilters(this.filters);
    });

    this.events.subscribe('functionCall:apiPairings', (pairings) => {
        this.updateResultCounts(pairings);
    });

    this.addFilterPage = AddFilterPage;

    this.settingsStorage.getFilters((filters:Array<{name: string, created: string, data: any, pairings: any}>) => {
      console.log(filters);
      this.filters = filters;
    })
  }
  request() {

  }

  updateResultCounts(pairings) {
      for(var index in this.filters) {
        if(typeof(pairings[this.filters[index]['name']]) === 'undefined') {
            this.filters[index]['pairings'] = false;
            continue;
        }
        this.filters[index]['pairings'] = pairings[this.filters[index]['name']];
      }
  }

  filterAddedNotifiaction(name) {
    let notification = this.toastCtrl.create({
      message: name + ' has been added successfully',
      duration: 2000
    });
    notification.present();
  }

  filterRemovedNotifiaction(name) {
    let notification = this.toastCtrl.create({
      message: name + ' has been removed successfully',
      duration: 2000
    });
    notification.present();
  }

  showNotification(filterIndex) {
    var filter=this.filters[filterIndex];
    let alert = this.alertCtrl.create({
      title: filter.name,
      subTitle: '<a href="http://google.com">'+filter.pairings[1]+'Link</a>',
      buttons: ['OK']
    });
    alert.present();
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
            this.filterRemovedNotifiaction(this.filters[index].name);
            this.filters.splice(index, 1);
            this.settingsStorage.saveFilters(this.filters);
          }
        }
      ]
    });
    actionSheet.present();
  }


}
