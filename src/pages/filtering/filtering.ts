import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, Events, ToastController, ActionSheetController } from 'ionic-angular';
import { SettingsStorage } from '../../providers/settings-storage';
import { FiltersPage } from '../../modals/settings-modals/filters/filters';
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

  public filters:Array<{name: string, created: string, data: any}> = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController, public toastCtrl: ToastController, public events: Events, private settingsStorage: SettingsStorage, public actionSheetCtrl: ActionSheetController) {
    this.events.subscribe('filter:created', (data) => {
      let created = moment().format('YYYY-MM-DD hh:mm A');
      let name = 'Filter ' + (this.filters.length + 1);
      console.log({ name: name, created: created, data: data});
      this.filters.push({ name: name, created: created, data: data});
      this.filterAddedNotifiaction('New filter');
      console.log(this.filters);
      this.settingsStorage.saveFilters(this.filters);
    });
    this.settingsStorage.getFilters((filters:Array<{name: string, created: string, data: any}>) => {
      console.log(filters);
      this.filters = filters;
    })
  }

  addFilter() {
    let filtersPage = this.modalCtrl.create(FiltersPage);
    filtersPage.present();
  }

  request() {
    
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

  ionViewDidLoad() {
    console.log('Hello SettingsPage Page');
  }
}
