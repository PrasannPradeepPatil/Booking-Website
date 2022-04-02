import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from "@angular/common/http"
import { BehaviorSubject } from 'rxjs';

import { HotelSearch } from './../model/hotel-search.model';

@Injectable({
  providedIn: 'root'
})
export class HotelSearchService {

  getHotelsUrl: string = "/booking/hotelSearch";

  private currentHotelSearch : HotelSearch;
  private messageSource = new BehaviorSubject<HotelSearch[]>(null);

  constructor(public http: HttpClient) {

   }

  searchHotels(input :HotelSearch){
    this.http.post<HotelSearch[]>(this.getHotelsUrl, input).subscribe((response) => {this.messageSource.next(response)});
    

  }







}
