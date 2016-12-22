import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Main page elements
import { MainPage } from '../pages/main/main';
import { SetOperatesPage } from '../pages/main/basicSettingsModals/set-operates/set-operates'; 
import { ExcludePositionsPage } from '../pages/main/basicSettingsModals/exclude-positions/exclude-positions';
//Settings page elements
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
  SetOperatesPage,
  ExcludePositionsPage
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
  SetOperatesPage,
  ExcludePositionsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SettingsStorage, Api]
})
export class AppModule {}
