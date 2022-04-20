import { HotelConfirmation } from './../../model/hotel-confirmation';
import { HotelPayment } from './../../model/hotel-payment.model';
import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from "@angular/common/http"
import { BehaviorSubject } from 'rxjs';

import { HotelSearch } from '../../model/hotel-search.model';
import { HotelListing } from '../../model/hotel-listing.model';
import { HotelPaymentStage1Service } from '../payment/hotel-payment-stage1/hotel-payment-stage1.service';

@Injectable({
  providedIn: 'root'
})
export class HotelSearchService {

  getHotelsUrl: string = "/booking/hotelSearch";
  verifyHotelOTPURL: string ="booking/hotelPayment";
  hotelConfirmationURL: string ="/booking/hotelConfirm"

  private currentHotelSearch : HotelSearch;
  private messageSource = new BehaviorSubject<HotelListing[]>(null);
  currentMessage = this.messageSource.asObservable();
  hotelGuestInfo: HotelPayment;

  hotelSearch: HotelSearch;
  hotelsListingArray : HotelListing[];

  constructor(public http: HttpClient, private hotelPaymentStage1Service: HotelPaymentStage1Service) {

   }

  searchHotels(input :HotelSearch){
    this.hotelSearch = input;
    this.http.post<HotelListing[]>(this.getHotelsUrl, input).subscribe((response) => {
      
      this.hotelsListingArray = response
      this.messageSource.next(this.hotelsListingArray );
    });
  }

  getHotelsArray()
  {
    return this.hotelsListingArray;
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
        this.hotelsListingArray = response
      });

  }

  verifyOTP()
  {
    this.hotelGuestInfo = this.hotelPaymentStage1Service.getUserDetails();
    return this.http.post<any>(this.verifyHotelOTPURL, 
                          {CustomerName: this.hotelGuestInfo.CustomerName,
                           MobileNumber: this.hotelGuestInfo.MobileNumber,
                           EmailAdd: this.hotelGuestInfo.EmailAdd });
  }

  saveConfirmation(hotelConfirmation: HotelConfirmation)
  {
    console.log("Flight confirm");
    // console.log(flightConfirmation);
    this.http.post<any>(this.hotelConfirmationURL, hotelConfirmation).subscribe(response =>
      {});
  }




}
