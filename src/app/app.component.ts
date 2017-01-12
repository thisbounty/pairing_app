import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MainPage } from '../pages/main/main';
import { FilteringPage } from '../pages/filtering/filtering';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsStorage } from '../providers/settings-storage';
import { DateUtils } from '../providers/date-utils';


@Component({
  templateUrl: 'app.html',
  providers: [ SettingsStorage, DateUtils ]
})
export class MyApp {
  rootPage = MainPage;
  nav;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, settingsStorage: SettingsStorage, app: App) {
    this.pages = [
      { title: 'Settings', component: SettingsPage },
      { title: 'Filtering', component: FilteringPage },
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.nav = app.getRootNav();
    });
  }
  openPage(page){
    this.nav.push(page.component);
  }
}
