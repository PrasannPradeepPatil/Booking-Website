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
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightPaymentComponent } from './flight-payment/flight-payment.component';

import { FlightListingFilterComponent } from './flight-listing-filter/flight-listing-filter.component';
import { PaymentStage1Component } from './payment-stage1/payment-stage1.component';
import { PaymentStage3Component } from './payment-stage3/payment-stage3.component';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlightSearchComponent,
    NgbdDatepickerRangePopup,
    NgbdDatepickerPopup,
    FlightListingComponent,
    FlightDetailsComponent,
    FlightPaymentComponent,
    FlightListingFilterComponent,
    PaymentStage1Component,
    PaymentStage3Component,
    HotelSearchComponent
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
export class AppModule {}
