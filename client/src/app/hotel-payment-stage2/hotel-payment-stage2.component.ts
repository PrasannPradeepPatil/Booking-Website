import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HotelDetails} from '../model/hotel-details.model';
import { HotelPayment } from '../model/hotel-payment.model';

import { HotelListingService } from '../hotel-listing/hotel-listing.service';
import { HotelPaymentStage1Service } from '../hotel-payment-stage1/hotel-payment-stage1.service';
import { HotelPaymentStage2Service} from '../hotel-payment-stage2/hotel-payment-stage2.service';

@Component({
  selector: 'app-hotel-payment-stage2',
  templateUrl: './hotel-payment-stage2.component.html',
  styleUrls: ['./hotel-payment-stage2.component.css']
})
export class HotelPaymentStage2Component implements OnInit {

  hotelDetails:HotelDetails;
  hotelPayment:HotelPayment;
  constructor(private hotelListingService: HotelListingService,private hotelPaymentStage1Service:HotelPaymentStage1Service,private hotelPaymentStage2Service:HotelPaymentStage2Service, private router: Router) { }

  ngOnInit(): void {
    this.hotelPaymentStage1Service.hotelPaymentStage1Observable.subscribe((response:HotelPayment)=>{
      this.hotelPayment = response;

    });

    this.hotelListingService.hotelListingObservable.subscribe((response:HotelDetails)=>{
      this.hotelDetails = response;
    });
  }

  sendUserDetails(){
    this.hotelPaymentStage2Service.sendUserDetails(this.hotelPayment);

  }

  calculatePrice(StandardPrice: string){
    var price = Number(StandardPrice)
    var totalPrice = price*0.1 + price*0.05 + price;
    return "" + totalPrice;
  }
}
