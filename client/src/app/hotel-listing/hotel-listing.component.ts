import { HotelSearch } from './../model/hotel-search.model';
import { HotelSearchService } from './../hotel-search/hotel-search.service';
import { Component, OnInit } from '@angular/core';


import { HotelListing } from '../model/hotel-listing.model';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrls: ['./hotel-listing.component.css']
})
export class HotelListingComponent implements OnInit {
  hotelListing: HotelListing[] = this.hotelSearchService.getHotelsArray();
  sortType: string = '';
  hotelSearch: HotelSearch;

  constructor(private hotelSearchService: HotelSearchService) { }

  ngOnInit(): void {
    var date1 =  new NgbDate(2020,19,22);
    var date2 = new NgbDate(2020,19,23);
    this.hotelSearchService.currentMessage.subscribe(response =>
      {
        this.hotelListing = response;
        console.log("Hotel Listing");
    console.log(this.hotelListing);
      })
    }

    onSort(sortType: string)
    {
      this.sortType = sortType;

      if(sortType== 'price')
      {
        this.hotelSearch = this.hotelSearchService.getCurrentHotelSearch();
        this.hotelSearch.Pricefilter = 'A';
        this.hotelSearch.Ratingfilter = '';
        this.hotelSearchService.updateHotelSearch(this.hotelSearch);
      }
      else
      {
        this.hotelSearch = this.hotelSearchService.getCurrentHotelSearch();
        this.hotelSearch.Ratingfilter = 'D';
        this.hotelSearch.Pricefilter = '';
        this.hotelSearchService.updateHotelSearch(this.hotelSearch);
      }
    }

}
