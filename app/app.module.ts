import * as angular from 'angular';
// Upgrade-Adapter
import {UpgradeAdapter} from '@angular/upgrade';

// Angular
import {forwardRef, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

// Migrated Component
import {MigratedFlightSearchComponent} from "./flight-search/migrated-flight-search.component";
import {FlightService} from './services/flight.service';
import {createCityFilter} from './fliters/city.filter';
import {createFlightCardDirective} from './flight-search/flight-card.directive';
import {createCityValidatorDDO} from './validation/city-validator';
import {createCityAsyncValidatorDDO} from './validation/city-async-validator';
import {HomeComponent} from './home/home.component';
import {PassengerSearchComponent} from './passenger-search/passenger-search.component';
import {AppComponent} from './app.component';
import {MigratedFlightEditComponent} from "./flight-edit/migrated-flight-edit.component";
import {FlightBookingComponent} from './flight-booking/flight-booking.component';
import {OAuthService} from 'angular2-oauth2/oauth-service';
import {BookingEventService} from './services/booking-event.service';
import {ShoppingCardComponent} from './shopping-card/shopping-card.component';
import {MigratedPassengerService} from "./services/migrated-passenger.service";
import tabs from './tabs/tabs.module';
import {MigratedTabsModule} from "./tabs/migrated-tabs.module";
import {PassengerCardComponent} from "./passenger-search/passenger-card.component";

var app = angular.module('flight-app', ['ngMessages', 'ui.router', tabs]);


app.service('flightService', FlightService);
app.service('flightService', FlightService);
app.service('bookingEventService', BookingEventService);
app.service('oauthService', OAuthService);
app.constant('baseURL', 'http://www.angular.at')
app.filter('city', createCityFilter);
app.directive('flightCard', createFlightCardDirective);
app.directive('city', createCityValidatorDDO);
app.directive('cityAsync', createCityAsyncValidatorDDO);
app.component('home', HomeComponent);
app.component('passengerSearch', PassengerSearchComponent);
app.component('passengerCard', PassengerCardComponent);
app.component('app', AppComponent);
app.component('flightBooking', FlightBookingComponent);
app.component('shoppingCard', ShoppingCardComponent);

export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        // Add import for MigratedTabsModule
        MigratedTabsModule
    ],
    declarations: [
        MigratedFlightSearchComponent,
        MigratedFlightEditComponent,
        upgradeAdapter.upgradeNg1Component('flightCard')
    ],
    providers: [
        MigratedPassengerService
    ]
})
class AppModule {
}

upgradeAdapter.upgradeNg1Provider('flightService');
app.directive('migratedFlightSearch', <any>upgradeAdapter.downgradeNg2Component(MigratedFlightSearchComponent))
app.directive('flightEdit', <any>upgradeAdapter.downgradeNg2Component(MigratedFlightEditComponent));
app.factory('passengerService', upgradeAdapter.downgradeNg2Provider(MigratedPassengerService));