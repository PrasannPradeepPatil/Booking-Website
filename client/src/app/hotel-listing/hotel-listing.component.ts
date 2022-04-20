import { HotelSearch } from './../model/hotel-search.model';
import { HotelSearchService } from './../hotel-search/hotel-search.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { HotelListing } from '../model/hotel-listing.model';
import { HotelListingService } from './hotel-listing.service';
import { HotelDetailsComponent } from '../hotel-details/hotel-details.component';

@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrls: ['./hotel-listing.component.css']
})
export class HotelListingComponent implements OnInit {
  hotelListing: HotelListing[] = this.hotelSearchService.getHotelsArray();
  sortType: string = '';
  hotelSearch: HotelSearch;

  constructor(private hotelSearchService: HotelSearchService,private hotelListingService:HotelListingService,private modalService: NgbModal) {

   }

  ngOnInit(): void {
    this.hotelSearchService.currentMessage.subscribe(response =>
      {
        this.hotelListing = response;
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
    
  openXl(hotelId:String){
    const modalRef = this.modalService.open(HotelDetailsComponent, { size: 'xl' });
    modalRef.componentInstance.hotel_id = hotelId;+

    this.hotelListingService.getHotelDetails(hotelId)
  }


}
