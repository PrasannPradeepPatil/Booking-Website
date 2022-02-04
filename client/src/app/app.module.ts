import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FlightListingComponent } from './flight-listing/flight-listing.component';
import { FlightDetailsService } from './service/flight-details.service'
import { HttpClientModule } from '@angular/common/http';
import { FlightDetailsFilterComponent } from './flight-details-filter/flight-details-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlightListingComponent,
    FlightDetailsFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [FlightDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
