import { FlightPaymentComponent } from './flight-payment/flight-payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightListingComponent } from './flight-listing/flight-listing.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { PaymentStage1Component } from './payment-stage1/payment-stage1.component';


const routes: Routes = [
  {path: '', redirectTo: '/flights', pathMatch: 'full'},
  {path:'flights', component: FlightSearchComponent, children:[
    {path: 'listing', component: FlightListingComponent}]},
  {path: 'details', component: FlightDetailsComponent},
  {path: 'payment', component: FlightPaymentComponent},
  {path: 'ticketType', component: PaymentStage1Component}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
