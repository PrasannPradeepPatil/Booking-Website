import { FlightSearchService } from './flight-search/flight-search-service';
import { NgbdDatepickerPopup } from './flight-search/datepicker-popup';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import {NgbdDatepickerRangePopup} from './flight-search/datepicker-range-popup';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlightListingComponent } from './flight-listing/flight-listing.component';
import { FlightDetailsService } from './service/flight-details.service'
import { FlightDetailsFilterComponent } from './flight-details-filter/flight-details-filter.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightPaymentComponent } from './flight-payment/flight-payment.component';
// import * as mdb from 'mdb-ui-kit';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // If You need animations

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlightSearchComponent,
    NgbdDatepickerRangePopup,
    NgbdDatepickerPopup,
    FlightListingComponent,
    FlightDetailsFilterComponent,
    FlightDetailsComponent,
    FlightPaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [FlightDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
