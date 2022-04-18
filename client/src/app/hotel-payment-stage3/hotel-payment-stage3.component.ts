import { Component, OnInit } from '@angular/core';

import { HotelDetails} from '../model/hotel-details.model';
import { HotelPayment } from '../model/hotel-payment.model';

import { HotelPaymentStage1Service } from '../hotel-payment-stage1/hotel-payment-stage1.service';
import { HotelPaymentStage2Service } from '../hotel-payment-stage2/hotel-payment-stage2.service';
import { HotelPaymentStage3Service } from '../hotel-payment-stage3/hotel-payment-stage3.service';
import { HotelListingService } from '../hotel-listing/hotel-listing.service';

@Component({
  selector: 'app-hotel-payment-stage3',
  templateUrl: './hotel-payment-stage3.component.html',
  styleUrls: ['./hotel-payment-stage3.component.css']
})
export class HotelPaymentStage3Component implements OnInit {

  
  hotelDetails:HotelDetails;
  hotelPayment:HotelPayment;
  constructor(private hotelPaymentStage1Service:HotelPaymentStage1Service,
    private hotelPaymentStage2Service:HotelPaymentStage2Service,
    private hotelPaymentStage3Service:HotelPaymentStage3Service,
    private hotelListingService: HotelListingService ) { }

  ngOnInit(): void {
    this.hotelPaymentStage1Service.hotelPaymentStage1Observable.subscribe((response:HotelPayment)=>{
      this.hotelPayment = response;

    });

    this.hotelListingService.hotelListingObservable.subscribe((response:HotelDetails)=>{
      this.hotelDetails = response;
    });

    // console.log("HOTEL DETAILS");
    // console.log(this.hotelDetails);
    // console.log("HOTEL PAYMENT");
    // console.log(this.hotelPayment);


  }

  /*
  CLIENT NAME : 

  CLIENT EMAIL ADRESS PE BHEJ DIYA

  HOTEL NAME:

  HOTEL ADRESS:
  */

}
