import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Main page elements
import { MainPage } from '../pages/main/main';
//Settings page elements
import { SettingsPage } from '../pages/settings/settings';
//Filtering page elements
import { FilteringPage } from '../pages/filtering/filtering';
import { AddFilterPage } from '../pages/addFilter/addFilter';
import { SetAirportPage } from '../modals/settings-modals/set-airport/set-airport';
import { SetLoginDetailsPage } from '../modals/settings-modals/set-login-details/set-login-details';
import { PairingCreditPage } from '../modals/settings-modals/pairing-credit/pairing-credit';
import { DutyPeriodTimePage } from '../modals/settings-modals/duty-period-time/duty-period-time';
import { LayoverPage } from '../modals/settings-modals/layover/layover';
import { FlightPage } from '../modals/settings-modals/flight/flight';
import { ReportBetweenPage } from '../modals/settings-modals/report-between/report-between';
import { ReleaseBetweenPage } from '../modals/settings-modals/release-between/release-between';
import { LegsPerDutyPage } from '../modals/settings-modals/legs-per-duty/legs-per-duty';
import { SetDatesPage } from '../modals/settings-modals/set-dates/set-dates';
import { SetOperatesPage } from '../modals/settings-modals/set-operates/set-operates';
//Providers
import { SettingsStorage } from '../providers/settings-storage';
import { Api } from '../providers/api';
import { BackgroundTask } from '../providers/background-task';

@NgModule({
  declarations: [
    MyApp,
	MainPage,
  SettingsPage,
  FilteringPage,
  AddFilterPage,
  SetAirportPage,
  SetLoginDetailsPage,
  DutyPeriodTimePage,
  PairingCreditPage,
  LayoverPage,
  FlightPage,
  ReportBetweenPage,
  ReleaseBetweenPage,
  LegsPerDutyPage,
  SetDatesPage,
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
  FilteringPage,
  AddFilterPage,
  SetAirportPage,
  SetLoginDetailsPage,
  DutyPeriodTimePage,
  PairingCreditPage,
  LayoverPage,
  FlightPage,
  ReportBetweenPage,
  ReleaseBetweenPage,
  LegsPerDutyPage,
  SetDatesPage,
  SetOperatesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SettingsStorage, Api, BackgroundTask]
})
export class AppModule {}
