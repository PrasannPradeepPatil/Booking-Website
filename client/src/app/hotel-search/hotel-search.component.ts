import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotelSearch } from '../model/hotel-search.model';
import { DateRange } from './../model/dateRange.model';
import { HotelSearchService } from './hotel-search.service';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.css']
})
export class HotelSearchComponent implements OnInit {
  userForm = new FormGroup({
    hotelLocation: new FormControl(),
  });
  hotelLocation : FormControl = new FormControl();
  hotelSuggestions: HotelSearch[] = [];
  hotelSearch: HotelSearch;
  dateRange: DateRange;
  hotelSearchService: HotelSearchService;




  constructor() { }

  ngOnInit(): void {
  }


  onFormSubmit(){ 
    this.hotelSearch = new HotelSearch(this.userForm.get('hotelLocation').value,this.dateRange.startDate,this.dateRange.endDate);
    this.hotelSearchService.searchHotels(this.hotelSearch);   
  }

  suggestHotelLocation(){

  }

  onHotelLocationSelect(){

  }

  getDateRange($event: DateRange)
  {
    this.dateRange = $event;
  }

}
