import { Component, OnInit } from '@angular/core';


import { HotelListing } from '../model/hotel-listing.model';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrls: ['./hotel-listing.component.css']
})
export class HotelListingComponent implements OnInit {
  hotelListing: HotelListing[] =[];
  constructor() { }

  ngOnInit(): void {
    var date1 =  new NgbDate(2020,19,22);
    var date2 = new NgbDate(2020,19,23);
    var obj1 = new HotelListing("San mateo","California",date1,date2,"",""); 
    var obj2 = new HotelListing("San Jose","California",date1,date2,"",""); 
    var obj3 = new HotelListing("San Francisco","California",date1,date2,"",""); 

    this.hotelListing.push(obj1);
    this.hotelListing.push(obj2);
    this.hotelListing.push(obj3);

    



  }

}
