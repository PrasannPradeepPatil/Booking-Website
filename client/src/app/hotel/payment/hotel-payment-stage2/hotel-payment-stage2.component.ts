import { Util } from './../../../common/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HotelDetails} from '../../../model/hotel-details.model';
import { HotelPayment } from '../../../model/hotel-payment.model';

import { HotelListingService } from '../../hotel-listing/hotel-listing.service';
import { HotelSearchService } from '../../hotel-search/hotel-search.service';
import { HotelPaymentStage1Service } from '../hotel-payment-stage1/hotel-payment-stage1.service';
import { HotelPaymentStage2Service} from './hotel-payment-stage2.service';

@Component({
  selector: 'app-hotel-payment-stage2',
  templateUrl: './hotel-payment-stage2.component.html',
  styleUrls: ['./hotel-payment-stage2.component.css']
})
export class HotelPaymentStage2Component implements OnInit {

  hotelDetails:HotelDetails;
  hotelPayment:HotelPayment;
  fetchedOTP: string;
  isSuccess = false;
  showError = false;

  constructor(private hotelListingService: HotelListingService,private hotelPaymentStage1Service:HotelPaymentStage1Service, 
            private hotelPaymentStage2Service:HotelPaymentStage2Service, private router: Router,
            private modalService: NgbModal,private hotelSearchService: HotelSearchService, private util: Util) { }

  ngOnInit(): void {
    this.hotelPaymentStage1Service.hotelPaymentStage1Observable.subscribe((response:HotelPayment)=>{
      this.hotelPayment = response;

    });

    this.hotelListingService.hotelListingObservable.subscribe((response:HotelDetails)=>{
      this.hotelDetails = response;
    });

    this.hotelSearchService.verifyOTP().subscribe(
      response => 
      {this.fetchedOTP= response.otpCode;
        localStorage.setItem("HOTP",this.fetchedOTP)});
  }

  sendUserDetails(content: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    
  }

  calculatePrice(StandardPrice: string){
    var price = Number(StandardPrice)
    var totalPrice = price*0.1 + price*0.05 + price;
    return "" + totalPrice;
  }

  onOtpChange(event: string)
  {
    if(event.length == 6)
    {
      if(this.fetchedOTP === event)
      {
        this.isSuccess = true;
      }
    }
  }

  verify() 
  {
    if(this.isSuccess == true)
    {
      this.showError = false;
      this.modalService.dismissAll();
      this.router.navigate(['/hotelPaymentStage3']);
    }
    else
    {
      this.showError = true;
    }
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
