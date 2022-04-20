import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



import { HotelDetails} from '../../../model/hotel-details.model';
import { HotelPayment } from '../../../model/hotel-payment.model';

import { HotelListingService } from '../../hotel-listing/hotel-listing.service';
import { HotelDetailsService } from '../../hotel-details/hotel-details.service';
import { HotelPaymentStage1Service } from './hotel-payment-stage1.service';

@Component({
  selector: 'app-hotel-payment-stage1',
  templateUrl: './hotel-payment-stage1.component.html',
  styleUrls: ['./hotel-payment-stage1.component.css']
})
export class HotelPaymentStage1Component implements OnInit {

  
  userForm :FormGroup;
  hotelDetails:HotelDetails;
  hotelPayment:HotelPayment;
  submitted = false;
  constructor(private hotelListingService: HotelListingService,private hotelPaymentStage1Service:HotelPaymentStage1Service,
                private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: '',
      contact: '',
      first_name: '',
      last_name: '',
      gender: '',
      check: '',
    });

    this.hotelListingService.hotelListingObservable.subscribe((response:HotelDetails)=>{
      this.hotelDetails = response;
    });

  }

  onFormSubmit(form: FormGroup){
    this.hotelPayment = new HotelPayment(this.userForm.get('first_name').value,this.userForm.get('contact').value,this.userForm.get("email").value);
    
    this.hotelPaymentStage1Service.sendUserDetails(this.hotelPayment);
    this.router.navigate(['/hotelPaymentStage2']);

  }
  calculatePrice(StandardPrice: string){
    var price = Number(StandardPrice)
    var totalPrice = price*0.1 + price*0.05 + price;
    return "" + totalPrice;
  }

}
