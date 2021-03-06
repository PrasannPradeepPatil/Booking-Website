import { HotelSearchComponent } from './hotel/hotel-search/hotel-search.component';
import { FlightPaymentComponent } from './flight/payment/flight-payment/flight-payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchComponent } from './flight/flight-search/flight-search.component';
import { FlightListingComponent } from './flight/flight-listing/flight-listing.component';
import { FlightDetailsComponent } from './flight/flight-details/flight-details.component';
import { PaymentStage1Component } from './flight/payment/payment-stage1/payment-stage1.component';
import { PaymentStage4Component } from './flight/payment/payment-stage4/payment-stage4.component';
import { PaymentStage3Component } from './flight/payment/payment-stage3/payment-stage3.component';
import { HotelListingComponent } from './hotel/hotel-listing/hotel-listing.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserHistoryComponent } from './user/user-history/user-history.component';
import { AuthGuard } from './common/auth.guard';

import { HotelPaymentStage1Component } from './hotel/payment/hotel-payment-stage1/hotel-payment-stage1.component';
import { HotelPaymentStage2Component } from './hotel/payment/hotel-payment-stage2/hotel-payment-stage2.component';
import { HotelPaymentStage3Component } from './hotel/payment/hotel-payment-stage3/hotel-payment-stage3.component';

const routes: Routes = [
  {path: '', redirectTo: '/flights', pathMatch: 'full'},
  {path:'flights', component: FlightSearchComponent, children:[
  {path: 'listing', component: FlightListingComponent}]},
  {path: 'details', component: FlightDetailsComponent},
  {path: 'payment', component: FlightPaymentComponent},
  {path: 'ticketType', component: PaymentStage1Component},
  {path: 'paymentConfirmation', component: PaymentStage4Component},
  {path: 'paymentInput', component: PaymentStage3Component},
  {path: 'hotels', component: HotelSearchComponent},
  {path: 'hotelListing', component: HotelListingComponent},
  {path: 'userRegistration', component: UserRegistrationComponent},
  {path: 'userLogin', component: UserLoginComponent},
  {path: 'userHistory', component: UserHistoryComponent,  canActivate: [AuthGuard]}, 
  {path: 'hotelType', component: HotelPaymentStage1Component},
  {path: 'hotelPaymentStage2', component: HotelPaymentStage2Component},
  {path: 'hotelPaymentStage3', component: HotelPaymentStage3Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
