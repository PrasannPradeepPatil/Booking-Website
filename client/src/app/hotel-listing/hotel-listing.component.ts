import { HotelSearchService } from './../hotel-search/hotel-search.service';
import { Component, OnInit } from '@angular/core';


import { HotelListing } from '../model/hotel-listing.model';
import { HotelListingService } from './hotel-listing.service';

@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrls: ['./hotel-listing.component.css']
})
export class HotelListingComponent implements OnInit {
  hotelListing: HotelListing[] = this.hotelSearchService.getHotelsArray();
  constructor(private hotelSearchService: HotelSearchService,private hotelListingService:HotelListingService) {

   }

  ngOnInit(): void {
    this.hotelSearchService.currentMessage.subscribe(response =>
      {
        this.hotelListing = response;
      })
  }



  getHotelDetails(hotelId:String){
    this.hotelListingService.getHotelDetails(hotelId)
  }


}
