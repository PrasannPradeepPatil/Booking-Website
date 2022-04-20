import { FlightSearchService } from './flight/flight-search/flight-search-service';
import { NgbdDatepickerPopup } from './flight/flight-search/datepicker-popup';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FlightSearchComponent } from './flight/flight-search/flight-search.component';
import {NgbdDatepickerRangePopup} from './flight/flight-search/datepicker-range-popup';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlightListingComponent } from './flight/flight-listing/flight-listing.component';
import { FlightDetailsService } from './flight/service/flight-details.service'
import { FlightDetailsComponent } from './flight/flight-details/flight-details.component';
import { FlightPaymentComponent } from './flight/payment/flight-payment/flight-payment.component';

import { FlightListingFilterComponent } from './flight/flight-listing-filter/flight-listing-filter.component';
import { PaymentStage1Component } from './flight/payment/payment-stage1/payment-stage1.component';
import { PaymentStage4Component } from './flight/payment/payment-stage4/payment-stage4.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { PaymentStage3Component } from './flight/payment/payment-stage3/payment-stage3.component';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { HotelListingComponent } from './hotel-listing/hotel-listing.component';
import { HotelListingFilterComponent } from './hotel-listing-filter/hotel-listing-filter.component';
import { DatePipe } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { UserService } from './user/service/user.service';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { JwtInterceptor } from './common/jwt.interceptor';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelPaymentStage1Component } from './hotel-payment-stage1/hotel-payment-stage1.component';
import { HotelPaymentStage2Component } from './hotel-payment-stage2/hotel-payment-stage2.component';
import { HotelPaymentStage3Component } from './hotel-payment-stage3/hotel-payment-stage3.component';


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
    PaymentStage4Component,
    PaymentStage3Component,
    HotelSearchComponent,
    HotelListingComponent,
    HotelListingFilterComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserHistoryComponent,
    HotelDetailsComponent,
    HotelPaymentStage1Component,
    HotelPaymentStage2Component,
    HotelPaymentStage3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgOtpInputModule
  ],
  providers: [FlightDetailsService, DatePipe, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
