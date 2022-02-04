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



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlightSearchComponent,
    NgbdDatepickerRangePopup,
    NgbdDatepickerPopup
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [FlightSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
