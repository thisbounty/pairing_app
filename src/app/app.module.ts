import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Main page elements
import { MainPage } from '../pages/main/main';
import { SetOperatesPage } from '../modals/settings-modals/set-operates/set-operates';
import { ExcludePositionsPage } from '../modals/settings-modals/exclude-positions/exclude-positions';
//Settings page elements
import { SettingsPage } from '../pages/settings/settings';
//Filtering page elements
import { FilteringPage } from '../pages/filtering/filtering';
import { FiltersPage } from '../modals/settings-modals/filters/filters';
import { SetAirportPage } from '../modals/settings-modals/set-airport/set-airport';
import { SetLoginDetailsPage } from '../modals/settings-modals/set-login-details/set-login-details';
import { ReportDatePage } from '../modals/settings-modals/report-date/report-date';
import { NumberOfCalendarDaysPage } from '../modals/settings-modals/number-of-calendar-days/number-of-calendar-days';
import { DutyPeriodNumberPage } from '../modals/settings-modals/duty-period-number/duty-period-number';
import { PairingCreditPage } from '../modals/settings-modals/pairing-credit/pairing-credit';
import { DutyPeriodTimePage } from '../modals/settings-modals/duty-period-time/duty-period-time';
import { LayoverPage } from '../modals/settings-modals/layover/layover';
import { FlightPage } from '../modals/settings-modals/flight/flight';
import { ReportBetweenPage } from '../modals/settings-modals/report-between/report-between';
import { ReleaseBetweenPage } from '../modals/settings-modals/release-between/release-between';
import { LegsPerDutyPage } from '../modals/settings-modals/legs-per-duty/legs-per-duty';
import { ExcludeEquipmentPage } from '../modals/settings-modals/exclude-equipment/exclude-equipment';
import { SetDatesPage } from '../modals/settings-modals/set-dates/set-dates';
//Providers
import { SettingsStorage } from '../providers/settings-storage';
import { Api } from '../providers/api';

@NgModule({
  declarations: [
    MyApp,
	MainPage,
  SettingsPage,
  FilteringPage,
  FiltersPage,
  SetAirportPage,
  SetLoginDetailsPage,
  ReportDatePage,
  NumberOfCalendarDaysPage,
  DutyPeriodNumberPage,
  DutyPeriodTimePage,
  PairingCreditPage,
  LayoverPage,
  FlightPage,
  ReportBetweenPage,
  ReleaseBetweenPage,
  LegsPerDutyPage,
  ExcludeEquipmentPage,
  SetDatesPage,
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
  FilteringPage,
  FiltersPage,
  SetAirportPage,
  SetLoginDetailsPage,
  ReportDatePage,
  NumberOfCalendarDaysPage,
  DutyPeriodNumberPage,
  DutyPeriodTimePage,
  PairingCreditPage,
  LayoverPage,
  FlightPage,
  ReportBetweenPage,
  ReleaseBetweenPage,
  LegsPerDutyPage,
  ExcludeEquipmentPage,
  SetDatesPage,
  SetOperatesPage,
  ExcludePositionsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SettingsStorage, Api]
})
export class AppModule {}
