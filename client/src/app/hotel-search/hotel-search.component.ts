import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotelSearch } from '../model/hotel-search.model';
import { DateRange } from './../model/dateRange.model';
import { HotelSearchService } from './hotel-search.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

/*
1.fromDate -- checkin , toDate -- checkout
*/

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.css']
})
export class HotelSearchComponent implements OnInit {
  userForm = new FormGroup({
    City: new FormControl(),
    State: new FormControl(),
  });
  City : FormControl = new FormControl();
  State : FormControl = new FormControl();
  hotelSuggestions: HotelSearch[] = [];
  hotelSearch: HotelSearch;
  dateRange: DateRange;
  hotelSearchService: HotelSearchService;
  calendar!: NgbCalendar;

  constructor(flightSearchService: HotelSearchService,calender: NgbCalendar) {
    this.hotelSearchService = flightSearchService;
    this.dateRange = new DateRange(calender.getToday(), calender.getNext(calender.getToday(), 'd', 10));


   }

  ngOnInit(): void {
  }


  onFormSubmit(){ 
    this.hotelSearch = new HotelSearch(this.userForm.get('City').value,this.userForm.get('State').value,this.dateRange.startDate,this.dateRange.endDate,"","");
    console.log(this.hotelSearch);
    this.hotelSearchService.searchHotels(this.hotelSearch);  

  }

  suggestState(){
  }

  suggestCity(){

  }

  onStateSelect(){


  }
  onCitySelect(){
    // this.userForm.get('City').setValue(airportCode);
    // this.destinationSuggestions = [];
    // this.destinationAirport.setValue(airportCode);  

  }

  getDateRange($event: DateRange){
    this.dateRange = $event;
  }






}
