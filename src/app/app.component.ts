import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MainPage } from '../pages/main/main';
import { SettingsStorage } from '../providers/settings-storage';


@Component({
  templateUrl: 'app.html',
  providers: [ SettingsStorage ]
})
export class MyApp {
  rootPage = MainPage;

  constructor(platform: Platform, settingsStorage: SettingsStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
