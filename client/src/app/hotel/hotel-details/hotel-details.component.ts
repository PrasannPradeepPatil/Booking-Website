import { Component, Input,OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Util } from '../../common/util'

import { HotelListing } from '../../model/hotel-listing.model';
import { HotelDetails } from '../../model/hotel-details.model';
import { HotelListingService } from '../hotel-listing/hotel-listing.service';
import { HotelDetailsService } from './hotel-details.service';
@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  hotel_id: string;
  hotelDetails:HotelDetails;
  closeResult: string;



  constructor(private hotelListingService: HotelListingService, private hotelDetailsService:HotelDetailsService,
              private modalService: NgbModal, public activeModal: NgbActiveModal, private router: Router, private util: Util) { }

  
  ngOnInit(): void {
    this.hotelListingService.hotelListingObservable.subscribe((response:HotelDetails)=>{
      this.hotelDetails = response;
    })

  }

  close() {
    this.activeModal.close();
    this.router.navigate(['/hotelType']);
  }
  
  openXl(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }





}
