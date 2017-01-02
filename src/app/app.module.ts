import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Main page elements
import { MainPage } from '../pages/main/main';
import { SetOperatesPage } from '../pages/main/basicSettingsModals/set-operates/set-operates';
import { ExcludePositionsPage } from '../pages/main/basicSettingsModals/exclude-positions/exclude-positions';
//Settings page elements
import { SettingsPage } from '../pages/settings/settings';
import { SetAirportPage } from '../pages/settings/settingsModals/set-airport/set-airport';
import { SetLoginDetailsPage } from '../pages/settings/settingsModals/set-login-details/set-login-details';
import { ReportDatePage } from '../pages/settings/settingsModals/report-date/report-date';
import { NumberOfCalendarDaysPage } from '../pages/settings/settingsModals/number-of-calendar-days/number-of-calendar-days';
import { DutyPeriodNumberPage } from '../pages/settings/settingsModals/duty-period-number/duty-period-number';
import { PairingCreditPage } from '../pages/settings/settingsModals/pairing-credit/pairing-credit';
import { DutyPeriodTimePage } from '../pages/settings/settingsModals/duty-period-time/duty-period-time';
import { FlightPage } from '../pages/settings/settingsModals/flight/flight';
import { ReportBetweenPage } from '../pages/settings/settingsModals/report-between/report-between';
import { ReleaseBetweenPage } from '../pages/settings/settingsModals/release-between/release-between';
import { ExcludeEquipmentPage } from '../pages/settings/settingsModals/exclude-equipment/exclude-equipment';
//Providers
import { SettingsStorage } from '../providers/settings-storage';
import { Api } from '../providers/api';

@NgModule({
  declarations: [
    MyApp,
	MainPage,
  SettingsPage,
  SetAirportPage,
  SetLoginDetailsPage,
  ReportDatePage,
  NumberOfCalendarDaysPage,
  DutyPeriodNumberPage,
  DutyPeriodTimePage,
  PairingCreditPage,
  FlightPage,
  ReportBetweenPage,
  ReleaseBetweenPage,
  ExcludeEquipmentPage,
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
  SetLoginDetailsPage,
  ReportDatePage,
  NumberOfCalendarDaysPage,
  DutyPeriodNumberPage,
  DutyPeriodTimePage,
  PairingCreditPage,
  FlightPage,
  ReportBetweenPage,
  ReleaseBetweenPage,
  ExcludeEquipmentPage,
  SetOperatesPage,
  ExcludePositionsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SettingsStorage, Api]
})
export class AppModule {}
