import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HotelSearch } from '../../model/hotel-search.model';
import { DateRange } from '../../model/dateRange.model';
import { HotelSearchService } from './hotel-search.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';



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

  constructor(flightSearchService: HotelSearchService,calender: NgbCalendar, private router: Router) {
    this.hotelSearchService = flightSearchService;
    this.dateRange = new DateRange(calender.getToday(), calender.getNext(calender.getToday(), 'd', 10));


   }

  ngOnInit(): void {
  }


  onFormSubmit(){ 
    var startDateString = this.dateRange.startDate.month + '/' + this.dateRange.startDate.day + '/'+ this.dateRange.startDate.year;
    var endDateString =  this.dateRange.endDate ? this.dateRange.endDate.month + '/' + this.dateRange.endDate.day + '/'+ this.dateRange.endDate.year : '';
    this.hotelSearch = new HotelSearch(this.userForm.get('City').value,this.userForm.get('State').value,startDateString,endDateString,"","");
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
