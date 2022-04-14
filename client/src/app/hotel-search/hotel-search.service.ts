import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from "@angular/common/http"
import { BehaviorSubject } from 'rxjs';

import { HotelSearch } from './../model/hotel-search.model';
import { HotelListing } from '../model/hotel-listing.model';

@Injectable({
  providedIn: 'root'
})
export class HotelSearchService {

  getHotelsUrl: string = "/booking/hotelSearch";

  private currentHotelSearch : HotelSearch;
  private messageSource = new BehaviorSubject<HotelListing[]>(null);
  currentMessage = this.messageSource.asObservable();

  hotelsListingArray : HotelListing[];

  constructor(public http: HttpClient) {

   }

  searchHotels(input :HotelSearch){
    this.http.post<HotelListing[]>(this.getHotelsUrl, input).subscribe((response) => {
      
      this.hotelsListingArray = response
      this.messageSource.next(this.hotelsListingArray );
    });
  }

  getHotelsArray()
  {
    return this.hotelsListingArray;
  }







}
