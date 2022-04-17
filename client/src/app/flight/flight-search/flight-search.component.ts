import { AirportSearch } from '../../model/airport-search.model';
import { FlightSearchService } from './flight-search-service';
import { DateRange } from '../../model/dateRange.model';
import { FlightSearch } from '../../model/flight-search.model';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']

})



export class FlightSearchComponent implements OnInit {

  tripInfo: boolean =true;
  userForm: FormGroup;

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
  listingDisplay: boolean = false;;


  constructor(flightSearchService: FlightSearchService, calender: NgbCalendar, public datepipe: DatePipe) 
  {
    this.dateRange = new DateRange(calender.getToday(), calender.getNext(calender.getToday(), 'd', 10));
    this.flightSearchService = flightSearchService;
   }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      no_of_trip: new FormControl(),
      sourceAirport: new FormControl(),
      destinationAirport: new FormControl(),
    });  
  }

  suggestSource() 
  {
    this.flightSearchService.getSuggestions(this.userForm.get('sourceAirport').value).subscribe(
      (response: any ) => {
        console.log(response);
        this.sourceSuggestions = response;
      }
    );

  }

  suggestDestination() 
  {
    this.flightSearchService.getSuggestions(this.userForm.get('destinationAirport').value).subscribe(
      (response: any) => {
        this.destinationSuggestions = response;
      });

  }

  onFormSubmit()
  {
    var startDateString = this.datepipe.transform(new Date(this.dateRange.startDate.year, this.dateRange.startDate.month - 1, this.dateRange.startDate.day), 'yyyy-MM-dd');
    var endDateString =  this.dateRange.endDate ? this.datepipe.transform(new Date(this.dateRange.endDate.year, this.dateRange.endDate.month -1, this.dateRange.endDate.day), 'yyyy-MM-dd'): '';
    this.flightSearch = new FlightSearch(this.userForm.get('sourceAirport').value,this.userForm.get('destinationAirport').value,startDateString, endDateString, JSON.stringify(this.tripInfo));
    console.log(this.flightSearch);
    this.flightSearchService.searchFlights(this.flightSearch);
    this.listingDisplay = true;   
  }

  changeTrip(event: Event) 
  {
    this.tripInfo = (event.target as HTMLInputElement).value == "true";
  }

  getDateRange($event: DateRange)
  {
    this.dateRange = $event;
  }

  onSourceSelect(airportcode: string)
  {
    this.userForm.get('sourceAirport').setValue(airportcode);
    this.sourceSuggestions = [];
    this.sourceAirport.setValue(airportcode);
  }

  onDestinationSelect(airportcode: string)
  {
    this.userForm.get('destinationAirport').setValue(airportcode);
    this.destinationSuggestions = [];
    this.destinationAirport.setValue(airportcode);
  }

  


}












