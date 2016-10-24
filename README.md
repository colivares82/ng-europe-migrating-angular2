# ng-europe-migrating-angular2
Exercise to migrate from Angular 1.x to Angular 2 (With Manfred Steyer)

Workshop with Manfred Steyer https://github.com/manfredsteyer

Migrating Angular 2 -  NG-Europe 2016 (Paris) - 24/oct/2016

There was given a main branch (Master) and then after the explanation the intention was to move all the code to Angular 2 with ng-upgrade (Downgrade and Upgrade)

My result is in the branch "solution-after-workshop"
The trainer result is in the branch "manfred-solution"

<h1>This are the steps:</h1>
_________________________________
_________________________________
_________________________________
_________________________________

<h1>Migrate to Angular 2 with ngUpgrade</h1>

<p>In this part of the lab, you will migrate AngularJS 1.x code to Angular 2 using ngUpgrade.</p>

<h2>Migrating FlightSearchComponent</h2>

<ol>
<li>
<p>Migrate the FlightSearchComponent to Angular. For this, create a file <code>migrated-flight-search.component</code> in the folder <code>flight-search</code> and add the following code:</p>

<pre><code>import { Component, Inject } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { Flight } from "../shared/flight";

@Component({
    selector: 'migrated-flight-search',
    templateUrl: './migrated-flight-search.component.html'
})
export class MigratedFlightSearchComponent {

    public from: string = "Hamburg";
    public to: string = "Graz";

    public selectedFlight: Flight;

    constructor(@Inject('flightService') private flightService: FlightService) {
    }

    public get flights() {
        return this.flightService.flights;
    }

    public search() {
        this.flightService.find(this.from, this.to);
    }

    public select(flight: Flight) {
        this.selectedFlight = flight;
    }
}
</code></pre>
</li>
<li><p>Note the usage of <code>@Inject('flightService')</code> in the listing above. <code>flightService</code> is the name of a service that has been written with AngularJS 1.x. It is reused together with the Angular 2 component in question.</p></li>
<li>
<p>Add a template for this component with the name <code>migrated-flight-search.component.html</code> to the folder <code>flight-search</code>:</p>

<pre><code>&lt;h1&gt;Flight Search (Migrated)&lt;/h1&gt;

&lt;div class="form-group"&gt;
    &lt;label&gt;From&lt;/label&gt;
    &lt;input class="form-control" [(ngModel)]="from" /&gt;
&lt;/div&gt;

&lt;div class="form-group"&gt;
    &lt;label&gt;To&lt;/label&gt;
    &lt;input class="form-control" [(ngModel)]="to" /&gt;
&lt;/div&gt;

&lt;div class="form-group"&gt;
    &lt;button class="btn btn-default" (click)="search()"&gt;Search&lt;/button&gt;
&lt;/div&gt;

&lt;div *ngFor="let f of flights" class="col-sm-6 col-md-4"&gt;

        &lt;flight-card
            [item]="f"
            [selectedItem]="selectedFlight"
            (selectedItemChange)="selectedFlight = $event"&gt;&lt;/flight-card&gt;

&lt;/div&gt;

&lt;pre&gt;Shopping Basket
------------------------
{{ selectedFlight | json }}
&lt;/pre&gt;
</code></pre>
</li>
<li><p>Note that <code>flight-card</code> is the name of a pre-existing AngularJS 1.x component which is reused here.</p></li>
<li>
<p>Switch to the file <code>app.module.ts</code> and add the following import statements at the top:</p>

<pre><code>// Upgrade-Adapter
import { UpgradeAdapter } from '@angular/upgrade';

// Angular
import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Migrated Component
import {MigratedFlightSearchComponent} from "./flight-search/migrated-flight-search.component";
</code></pre>
</li>
<li>
<p>Create an <code>UpgradeAdapter</code> at the end of <code>app.module.ts</code> and let it reference an <code>AppModule</code> that contains the migrated components and services. Also make sure to export it.</p>

<pre><code>export const upgradeAdapter = new UpgradeAdapter(forwardRef(() =&gt; AppModule));

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        MigratedFlightSearchComponent,
        upgradeAdapter.upgradeNg1Component('flightCard')
    ]
})
class AppModule {
}
</code></pre>
</li>
<li><p>Please note that the AppModule declares the <code>MigratedFlightSearchComponent</code> as well as an upgraded version of the <code>FlightCardComponent</code> which has been written with AngularJS 1.x.</p></li>
<li>
<p>Below the <code>AppModule</code> add code to upgrade the <code>FlightService</code> which has been written with AngularJS 1.x and should be used with Angular 2. Additionally, downgrade the <code>MigratedFlightSearchComponent</code> in order to be able to use it within the current AngularJS 1.x application.</p>

<pre><code>upgradeAdapter.upgradeNg1Provider('flightService');

app.directive('migratedFlightSearch', &lt;any&gt;upgradeAdapter.downgradeNg2Component(MigratedFlightSearchComponent))
</code></pre>
</li>
<li>
<p>Open the file <code>app.routes.ts</code> and replace the template in the route for <code>/flight</code> with a template, that points to the new <code>MigratedFlightSearchComponent</code>:</p>

<pre><code>[...]
.state('flightBooking.flightSearch', {
    url: '/flight',
    //template: '&lt;flight-search&gt;&lt;/flight-search&gt;'
    template: '&lt;migrated-flight-search&gt;&lt;/migrated-flight-search&gt;'
})
[...]
</code></pre>
</li>
<li>
<p>Switch to the file <code>app.ts</code> and import the UpgradeAdapter from <code>app.module</code>. Use it at the end to bootstrap the Angular app:</p>

<pre><code>import { upgradeAdapter } from './app.module';
import './app.routes';

// Use upgradeAdapter to manual bootstrap Angular1+2
upgradeAdapter.bootstrap(document.body, ['flight-app']);
</code></pre>
</li>
<li><p>In the <code>index.html</code> remove the <code>ng-app</code> within the <code>body</code> element. This is necessary because an Angular 1+2 application has to be bootstrapped manually.</p></li>
<li>Compile the project to make sure that there are no TypeScript errors.</li>
<li>Refresh the project in your browser and ensure that the app uses the <code>MigratedFlightSearchComponent</code> now. Make sure that a selected flight is displayed with orange background and within the shopping basket at the end of the page.</li>
</ol>

<h2>Using Two Way Binding in Angular 2</h2>

<ol>
<li>
<p>Navigate to the file <code>migrated-flight-search.component.html</code> and assure yourself that the element <code>flight-search</code> contains both, property bindings and event bindings:</p>

<pre><code>&lt;flight-card
    [item]="f"
    [selectedItem]="selectedFlight"
    (selectedItemChange)="selectedFlight = $event"&gt;&lt;/flight-card&gt;
</code></pre>
</li>
<li>
<p>Update it to use the less verbose two way binding syntax:</p>

<pre><code>&lt;flight-card [item]="f"
             [(selectedItem)]="selectedFlight"&gt;&lt;/flight-card&gt;
</code></pre>
</li>
<li><p>Assure yourself that the application still works as expected.</p></li>
</ol>

<h2>Migrating PassengerService</h2>

<ol>
<li><p>Have a look at the files <code>passenger-search.component.ts</code> and <code>passenger-search.component.html</code> in the folder <code>passenger-search</code>. </p></li>
<li><p>Assure yourself that the <code>PassengerSearchComponent</code> uses the <code>PassengerCardComponent</code> that can be found in the same folder as well as the <code>PassengerService</code> that is located in the folder <code>services</code>. Examine this implementations too.</p></li>
<li><p>Copy the file <code>passenger.service.ts</code> and name the copy <code>migrated-passenger.service.ts</code>. </p></li>
<li>
<p>Open the file <code>migrated-passenger.service.ts</code> and add the following imports for Angular 2:</p>

<pre><code>import {Http, URLSearchParams, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
</code></pre>
</li>
<li>
<p>Alter the class name to <code>MigratedPassengerService</code> and decorate it with <code>Injectable</code>:</p>

<pre><code>@Injectable()
export class MigratedPassengerService {
    [...]
}
</code></pre>
</li>
<li>
<p>Update the constructor so that it takes an argument of <code>Http</code> instead of the service <code>$http</code>:</p>

<pre><code>constructor(private http: Http) {
}
</code></pre>
</li>
<li>
<p>Add a debug message at the top of the method <code>find</code>:</p>

<pre><code>    find(name): Promise&lt;Passenger[]&gt; {
        // Add debug-info
        console.debug('calling MigratedPassengerService.find', name);
        [...]
    }
</code></pre>
</li>
<li>
<p>Update the creation of the variable <code>urlParams</code> because the new <code>Http</code> service uses an instance of <code>URLSearchParams</code> to represent parameters. Also create an instance of <code>Headers</code>:</p>

<pre><code>let urlParams = new URLSearchParams()
urlParams.set('name', name);

let headers = new Headers();
headers.set('Accept', 'text/json');
</code></pre>
</li>
<li>
<p>Update the call to the <code>Http</code> service:</p>

<pre><code>return this
        .http
        .get(url, {search: urlParams, headers: headers})
        .map(resp =&gt; resp.json())
        .toPromise();
</code></pre>
</li>
<li>
<p>Open the file <code>app.module.ts</code> and replace the <code>import</code> statement for the <code>PassengerService</code> with an <code>import</code> statement for the newly created <code>MigratedPassengerService</code>:</p>

<pre><code>// Remove import for PassengerService
// import {PassengerService} from "./services/passenger.service";

// Add import for MigratedPassengerService
import {MigratedPassengerService} from "./services/migrated-passenger.service";
</code></pre>
</li>
<li>
<p>Remove the registration for the <code>PassengerService</code>:</p>

<pre><code>// Remove the registration for passengerService
//app.service('passengerService', PassengerService);
</code></pre>
</li>
<li>
<p>As the <code>MigratedPassengerService</code> is an Angular 2 service, it needs to be registered with the Angular 2 module:</p>

<pre><code>@NgModule({
    [...]
    providers: [
        MigratedPassengerService
    ]
})
class AppModule {
}
</code></pre>
</li>
<li>
<p>As the <code>MigratedPassengerService</code> needs to be used with the pre-existing <code>PassengerSearchComponent</code>, which has been written with AngularJS 1.x, it has to be downgraded as well:</p>

<pre><code>// Downgrade MigratedPassengerService and register it as passengerService
app.factory('passengerService', upgradeAdapter.downgradeNg2Provider(MigratedPassengerService));
</code></pre>
</li>
<li><p>Compile the project to make sure that there are no TypeScript errors.</p></li>
<li><p>Refresh the project in your browser and ensure that the app uses the <code>MigratedPassengerService</code> now. If this is the case you should see a corresponding debug message in the browser console when searching for passengers.</p></li>
</ol>

<h2>Migrating FlightEditComponent and passing a routing parameter</h2>

<ol>
<li>Navigate to the folder <code>flight-edit</code> and explore the files <code>flight-edit.component.ts</code> as well as <code>flight-edit.component.html</code>.</li>
<li>Copy those files and name them <code>migrated-flight-edit.component.ts</code> and <code>migrated-flight-edit.component.html</code>.</li>
<li>
<p>Open the file <code>migrated-flight-edit.component.ts</code> and add the following <code>import</code>:</p>

<pre><code>import { Component, OnInit, Input, Inject } from '@angular/core';
</code></pre>
</li>
<li>
<p>Add a <code>Component</code> decorator to the class, rename it to <code>MigratedFlightEditComponent</code> and implement <code>OnInit</code>: </p>

<pre><code>@Component({
    selector: 'flight-edit',
    templateUrl: './migrated-flight-edit.component.html'
})
export class MigratedFlightEditComponent implements OnInit {
    [...]
}
</code></pre>
</li>
<li>
<p>Prefix the property <code>id</code> with <code>@Input()</code>. This allows to pass the <code>id</code> into the component by means of data binding later. Also assign an empty object to the property <code>flight</code> to prevent navigating over <code>undefined</code>: </p>

<pre><code>@Input() id: string;

flight: Flight = &lt;any&gt;{};
</code></pre>
</li>
<li>
<p>As the migrated component doesn't have access to the used version of UI-Router, remove the parameter $stateParams. Also add <code>@Inject('flightService')</code> to the remaining parameter. This is necessary because the <code>FlightService</code> is an upgraded AngularJS 1.x service registered under the name <code>flightService</code>:</p>

<pre><code>//old: constructor($stateParams: any, private flightService: FlightService)
constructor(@Inject('flightService') private flightService: FlightService) {
   [...]
}
</code></pre>
</li>
<li>
<p>Move the content of the constructor to a newly created method <code>ngOnInit</code>. This method is executed after properties like <code>id</code> have been bound. Remove the usage of <code>$stateParams</code>:</p>

<pre><code>ngOnInit() {
    // remove usage of $stateParams
    //this.id = $stateParams.id;

    this.flightService
        .getById(this.id)
        .then((flight: Flight) =&gt; {
            this.flight = flight;
            this.message = "";
        })
        .catch(resp =&gt; {
            console.error(resp);
            this.message = resp.data;
        })
}
</code></pre>
</li>
<li>
<p>Replace the template of the <code>FlightEditComponent</code>:</p>

<ul>
<li>Rename <code>ng-model</code> to <code>[(ngModel)]</code>
</li>
<li>Rename <code>ng-if</code> to <code>*ngIf</code>
</li>
<li>Remove the prefix <code>$ctrl.</code> from data binding expressions (e.g. use <code>{{id}}</code> instead of <code>{{$ctrl.id}}</code> </li>
</ul>
</li>
<li><p>Remove the <code>tabs</code> element and all <code>tab</code> elements within the template. We will migrate them in another exercise.</p></li>
<li>
<p>Move to the file <code>app.module</code> and register the <code>FlightEditComponent</code> within the <code>AppModule</code>, as it is an Anguler 2 Component:</p>

<pre><code>@NgModule({
    [...]
    declarations: [
        [...]
        MigratedFlightEditComponent
        [...]
    ],
    [...]
})
class AppModule {
}

</code></pre>
</li>
<li>
<p>Remove the <code>import</code> and declaration for the <code>FlightEditComponent</code>, as it is replaced with its migrated counterpart now:</p>

<pre><code>// Remove FlightEdit
//import {FlightEditComponent} from "./flight-edit/flight-edit.component";

[...]

// Remove registration for flightEdit
// app.component('flightEdit', FlightEditComponent);
</code></pre>
</li>
<li>
<p>Import the <code>MigratedFlightEditComponent</code>. Downgrade it to an AngularJS 1.x directive and register it:</p>

<pre><code>import {MigratedFlightEditComponent} from "./flight-edit/migrated-flight-edit.component";
[...]

app.directive('flightEdit', &lt;any&gt;upgradeAdapter.downgradeNg2Component(MigratedFlightEditComponent));
</code></pre>
</li>
<li>
<p>Switch to the file <code>app.routes.ts</code> and modify the route for <code>flight-edit</code>. To pass the parameter <code>id</code>, you need a controller that provides it to the template. In the template you can bind it to the property <code>id</code> of the <code>flight-edit</code> element:</p>

<pre><code>    [...]
    .state('flightBooking.flightEdit', {
        url: '/flight/:id',
        template: '&lt;flight-edit [id]="$ctrl.id"&gt;&lt;/flight-edit&gt;',
        resolve: {
            id: $stateParams =&gt; $stateParams.id
            // same as:
            // id: function($stateParams) { return $stateParams.id; }
        },
        controllerAs: '$ctrl',
        controller: function(id) { this.id = id; }
    });
</code></pre>
</li>
<li><p>Compile the project to make sure that there are no TypeScript errors.</p></li>
<li><p>Refresh the project in your browser and ensure that the app uses the <code>MigratedFlightEditComponent</code> now. </p></li>
</ol>

<h2>Migrating TabComponent **</h2>

<ol>
<li><p>Move to the the folder <code>tabs</code> and explore the implementation of the <code>tabs</code> control that can contain several <code>tab</code> elements. Try to find out how these components work and how they interact with each other.</p></li>
<li><p>Copy the file <code>tabs.component.ts</code> and name the copy <code>migrated-tabs.component.ts</code>.</p></li>
<li><p>Migrate the two components within the file <code>migrated-tabs.component.ts</code> to Angular 2.</p></li>
<li>
<p>Apply what you have learned during this tutorial for this migration and consider the following points:</p>

<ol>
<li>You can use the <code>ngAfterContentInit</code> as a replacement for <code>$postLink</code>. You can implement <code>AfterContentInit</code> from <code>@angular/core</code> which defines this method.</li>
<li>You can use the <code>ngOnInit</code> as a replacement for <code>$onInit</code>. You can implement <code>OnInit</code> from <code>@angular/core</code> which defines this method.</li>
<li>You can get a parent component by means of dependency injection: 
<code>
export class MigratedTabComponent implements OnInit {
    [...]
    constructor(private tabs: MigratedTabsComponent) {
    }
}
</code>
</li>
<li>Prefix properties, which you want to get via data binding, with <code>@Input()</code> from <code>@angular/core</code>.</li>
<li>The counterpart of <code>ng-transclude</code> in Angular 2 is <code>ng-content</code>.</li>
<li>Take care of the syntax for <code>*ngFor</code> which differs from the one of <code>ng-repeat</code>:
<code>
    AngularJS 1.x: ng-repeat="tab in $ctrl.tabs"
    Angular 2: *ngFor="let tab of tabs"
</code>
</li>
</ol>
</li>
<li>Move to the file <code>tabs.module.ts</code> and remove the registration for the old <code>tabs</code> and <code>tab</code> components:
<code>
// Remove registrations
// tabs.component('tab', tabComponentDesc);
// tabs.component('tabs', tabsComponentDesc);
</code>
</li>
<li>
<p>In the folder <code>tabs</code> create a file <code>migrated-tabs.module.ts</code> with a module for the migrated components:</p>

<pre><code>import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MigratedTabComponent, MigratedTabsComponent} from "./m-tabs.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MigratedTabsComponent,
        MigratedTabComponent
    ],
    exports: [
        MigratedTabsComponent,
        MigratedTabComponent
    ]
})
export class MigratedTabsModule {
}

</code></pre>
</li>
<li>
<p>Move to the file <code>app.module.ts</code> and import the <code>MigratedTabsModule</code>:</p>

<pre><code>import {MigratedTabsModule} from "./tabs/migrated-tabs.module";
</code></pre>
</li>
<li>
<p>Reference this <code>MigratedTabsModule</code> within the <code>imports</code> of the <code>AppModule</code>:</p>

<pre><code>@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        // Add import for MigratedTabsModule
        MigratedTabsModule
    ],
    [...]
})
class AppModule {
}

</code></pre>
</li>
<li>
<p>Switch to the file <code>migrated-flight-edit.component.html</code> within the folder <code>flight-edit</code> and reintroduce the <code>tab</code> and <code>tabs</code> elements you have removed during the last exercise:</p>

<pre><code>&lt;tabs&gt;
    &lt;tab title="Flight"&gt;
        [...]
    &lt;/tab&gt;
    &lt;tab title="Details"&gt;
    &lt;/tab&gt;
&lt;/tabs&gt;
</code></pre>
</li>
<li><p>Compile the project to make sure that there are no TypeScript errors.</p></li>
<li><p>Refresh the project in your browser and ensure yourself that the <code>tabs</code> control works correctly within the <code>flight-edit</code> route.</p></li>
</ol>
