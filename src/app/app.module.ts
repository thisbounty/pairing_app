import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main';
import { SetOperatesPage } from '../pages/main/basicSettingsModals/set-operates/set-operates'; 
import { SettingsPage } from '../pages/settings/settings';
import { SetAirportPage } from '../pages/settings/settingsModals/set-airport';
//Providers
import { SettingsStorage } from '../providers/settings-storage';
import { Api } from '../providers/api';

@NgModule({
  declarations: [
    MyApp,
	MainPage,
  SettingsPage,
  SetAirportPage,
  SetOperatesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	MainPage,
  SettingsPage,
  SetAirportPage,
  SetOperatesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SettingsStorage, Api]
})
export class AppModule {}
