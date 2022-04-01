import { FlightPaymentComponent } from './flight/payment/flight-payment/flight-payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchComponent } from './flight/flight-search/flight-search.component';
import { FlightListingComponent } from './flight/flight-listing/flight-listing.component';
import { FlightDetailsComponent } from './flight/flight-details/flight-details.component';
import { PaymentStage1Component } from './flight/payment/payment-stage1/payment-stage1.component';
import { PaymentStage4Component } from './flight/payment/payment-stage4/payment-stage4.component';
import { PaymentStage3Component } from './flight/payment/payment-stage3/payment-stage3.component';


const routes: Routes = [
  {path: '', redirectTo: '/flights', pathMatch: 'full'},
  {path:'flights', component: FlightSearchComponent, children:[
    {path: 'listing', component: FlightListingComponent}]},
  {path: 'details', component: FlightDetailsComponent},
  {path: 'payment', component: FlightPaymentComponent},
  {path: 'ticketType', component: PaymentStage1Component},
  {path: 'paymentConfirmation', component: PaymentStage4Component},
  {path: 'paymentInput', component: PaymentStage3Component}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
