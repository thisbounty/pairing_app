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
  public filters:Array<{name: string, created: string, data: any, pairings: any, id: any, trades: any}> = [];

  public addFilterPage:Component;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController,
              public toastCtrl: ToastController, public events: Events, private settingsStorage: SettingsStorage,
              public actionSheetCtrl: ActionSheetController) {
    this.events.subscribe('filter:created', (data, filterName, pairingsData, tradesData) => {
      pairingsData=false;
      let created = moment().format('YYYY-MM-DD hh:mm A');
      this.filters.push({ name: filterName, created: created, data: data, pairings: pairingsData, id:(this.filters.length+1), trades:tradesData});
      this.filterAddedNotifiaction('New filter');
      this.settingsStorage.saveFilters(this.filters);
    });

    this.events.subscribe('functionCall:apiPairings', (updatedFilters) => {
        this.filters=updatedFilters;
        updatedFilters[0]['data']='';
        var alert = this.alertCtrl.create({
          title: "Trades Data",
          subTitle: JSON.stringify(updatedFilters),
          buttons: ['OK']
        });
        alert.present();

        var alert = this.alertCtrl.create({
          title: "Pairings Data",
          subTitle: JSON.stringify(updatedFilters[0]),
          buttons: ['OK']
        });
        alert.present();


    });

    this.addFilterPage = AddFilterPage;

    this.settingsStorage.getFilters((filters:Array<{name: string, created: string, data: any, pairings: any, id: any, trades: any}>) => {
      this.filters = filters;
    })
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

  showNotification(filterIndex) {
    var filter=this.filters[filterIndex];
    var modalContent='';
    for(var index in filter.trades) {
        var trade = filter.trades[index];
         modalContent=modalContent+'<br>'+trade['report']+' <a href="https://crewportal.usairways.com/ETB/IntegratedPostTrip?tradeID='+trade['trade_id']+'&IsBulletin=True">'+trade['title']+'</a><br>'
    }
    let alert = this.alertCtrl.create({
      title: "Trades for: "+filter.name,
      subTitle: modalContent,
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
