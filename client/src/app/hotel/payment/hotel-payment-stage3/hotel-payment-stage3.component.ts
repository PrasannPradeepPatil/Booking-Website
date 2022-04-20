import { Util } from './../../../common/util';
import { HotelSearch } from './../../../model/hotel-search.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HotelDetails} from '../../../model/hotel-details.model';
import { HotelPayment } from '../../../model/hotel-payment.model';

import { HotelPaymentStage1Service } from '../hotel-payment-stage1/hotel-payment-stage1.service';
import { HotelPaymentStage2Service } from '../hotel-payment-stage2/hotel-payment-stage2.service';
import { HotelPaymentStage3Service } from './hotel-payment-stage3.service';
import { HotelListingService } from '../../hotel-listing/hotel-listing.service';
import { HotelSearchService } from '../../hotel-search/hotel-search.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotelConfirmation } from 'src/app/model/hotel-confirmation';

@Component({
  selector: 'app-hotel-payment-stage3',
  templateUrl: './hotel-payment-stage3.component.html',
  styleUrls: ['./hotel-payment-stage3.component.css']
})
export class HotelPaymentStage3Component implements OnInit {

  
  hotelDetails:HotelDetails;
  hotelPayment:HotelPayment;
  fetchedOTP: string;
  isSuccess = false;
  showError = false;
  currentHotelSearch: HotelSearch = this.hotelSearchService.getCurrentHotelSearch();

  constructor(private hotelPaymentStage1Service:HotelPaymentStage1Service,
    private hotelPaymentStage2Service:HotelPaymentStage2Service,
    private hotelPaymentStage3Service:HotelPaymentStage3Service,
    private hotelListingService: HotelListingService,
    private hotelSearchService: HotelSearchService,
    private util: Util) { }

  ngOnInit(): void {
    this.hotelPaymentStage1Service.hotelPaymentStage1Observable.subscribe((response:HotelPayment)=>
    {
      this.hotelPayment = response;

      this.hotelListingService.hotelListingObservable.subscribe((response:HotelDetails)=>
      {
        this.hotelDetails = response;

        this.hotelSearchService.saveConfirmation(new HotelConfirmation("Success",this.currentHotelSearch.Checkin, this.hotelPayment.CustomerName,
                                               this.hotelPayment.EmailAdd, this.hotelPayment.MobileNumber,this.hotelDetails.hotelName, 
                                               this.hotelDetails.city, this.hotelDetails.state, "001"));
      });
    });

    

    

      
  }

  calculatePrice(StandardPrice: string){
    var price = Number(StandardPrice)
    var totalPrice = price*0.1 + price*0.05 + price;
    return "" + totalPrice;
  }

  getTaxes(price: string)
  {
    return this.util.getTaxes(Number(price));
  }

  getAirlineFees(price: string)
  {
    return this.util.getAirlineFees(Number(price));
  }


}
