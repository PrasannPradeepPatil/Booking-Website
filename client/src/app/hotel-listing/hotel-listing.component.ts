import { Component, OnInit } from '@angular/core';


import { HotelListing } from '../model/hotel-listing.model';



@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrls: ['./hotel-listing.component.css']
})
export class HotelListingComponent implements OnInit {
  hotelListing: HotelListing[] =[];
  constructor() { }

  ngOnInit(): void {
    



  }

}
