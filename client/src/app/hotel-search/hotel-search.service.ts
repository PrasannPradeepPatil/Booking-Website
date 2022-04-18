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

  hotelsArray : HotelListing[];
  hotelSearch: HotelSearch;

  constructor(public http: HttpClient) {

   }

  searchHotels(input :HotelSearch){
    this.hotelSearch = input;
    this.http.post<HotelListing[]>(this.getHotelsUrl, input).subscribe((response) => {
      console.log(response);
      this.messageSource.next(response);
      this.hotelsArray = response
    });
  }

  getHotelsArray()
  {
    return this.hotelsArray;
  }

  getCurrentHotelSearch()
  {
    return this.hotelSearch;
  }

  updateHotelSearch(input: HotelSearch)
  {
      this.hotelSearch = input;

      this.http.post<HotelListing[]>(this.getHotelsUrl, input).subscribe((response) => {
        console.log(response);
        this.messageSource.next(response);
        this.hotelsArray = response
      });

  }







}
