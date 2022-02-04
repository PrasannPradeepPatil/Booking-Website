import { AirportSearch } from './../model/airport-search.model';
import { FlightSearchService } from './flight-search-service';
import { DateRange } from './../model/dateRange.model';
import { FlightSearch } from '../model/flight-search.model';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  tripInfo: string ="round-trip";
  userForm = new FormGroup({
    no_of_trip: new FormControl(),
    sourceAirport: new FormControl(),
    destinationAirport: new FormControl(),
  });

  sourceAirportCode: string;
  destinationAirportCode: string;

  flightSearch!: FlightSearch;
  calendar!: NgbCalendar;
  dateRange: DateRange;
  sourceAirport: FormControl = new FormControl();
  destinationAirport: FormControl = new FormControl();
  sourceSuggestions: AirportSearch[] = [];
  destinationSuggestions: AirportSearch[] = [];
  flightSearchService: FlightSearchService;


  constructor(flightSearchService: FlightSearchService, calender: NgbCalendar) 
  {
    this.dateRange = new DateRange(calender.getToday(), calender.getNext(calender.getToday(), 'd', 10));
    this.flightSearchService = flightSearchService;
   }

  ngOnInit(): void {
    console.log("here1");
  }

  suggestSource() 
  {
    // this.suggestions = this.countries
    //   .filter(c => {
    //     return c.startsWith(this.userForm.get('sourceAirport').value);
    //     // return c.toUpperCase().startsWith(JSON.stringify(this.userForm.get('sourceAirport').value).toUpperCase());
    //   })
    //   .slice(0, 4);

    this.flightSearchService.getSuggestions(this.userForm.get('sourceAirport').value).subscribe(
      (response: any) => {
        console.log(response);
        this.sourceSuggestions = response;
        console.log(this.sourceSuggestions);
      }
    );

  }

  suggestDestination() 
  {
    this.flightSearchService.getSuggestions(this.userForm.get('sourceAirport').value).subscribe(
      (response: any) => {
        console.log(response);
        this.destinationSuggestions = response;
        console.log(this.destinationSuggestions);
      });
  }

  onFormSubmit()
  {

    this.flightSearch = new FlightSearch(this.userForm.get('sourceAirport').value,this.userForm.get('destinationAirport').value,this.dateRange.startDate,this.dateRange.endDate,this.userForm.get('no_of_trip').value);
    this.flightSearchService.searchFlights(this.flightSearch);   
  }

  changeTrip(event: Event) 
  {
    this.tripInfo = (event.target as HTMLInputElement).value;
  }

  getDateRange($event: DateRange)
  {
    this.dateRange = $event;
  }

  onSourceSelect(airportCode: string)
  {
    this.userForm.get('sourceAirport').setValue(airportCode);
    this.sourceSuggestions = [];
    this.sourceAirport.setValue(airportCode);
  }

  onDestinationSelect(airportCode: string)
  {
    this.userForm.get('destinationAirport').setValue(airportCode);
    this.destinationSuggestions = [];
    this.destinationAirport.setValue(airportCode);
  }

}
