import { Util } from './../../common/util';
import { FlightDetailsService } from './../service/flight-details.service';
import { FlightDetails } from '../../model/flightDetails.models';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightSearchService } from '../flight-search/flight-search-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  @Input() flight_id: string;
  flightDetails: FlightDetails;

  ngOnInit(): void {
    this.flightSearchService.getFlightsById(this.flight_id);
    this.flightSearchService.flightDetailByIDMsg.subscribe((response: FlightDetails)=>
    {
      this.flightDetails = response;
      this.flightDetailsService.setFlightDetails(response);
    })
  }

  closeResult: string;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, private flightSearchService: FlightSearchService, 
              private router: Router, private flightDetailsService: FlightDetailsService, private util: Util) {}

  getTimetoDisplay(totalMinutes: number)
  {
    var hours = Math.floor(totalMinutes / 60);          
    var minutes = totalMinutes % 60;
    return hours+ "h : " + minutes + "m";
  }

  close() {
    this.activeModal.close();
    this.router.navigate(['/ticketType']);
  }
  
  openXl(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  transform(word: string)
  {
    return this.util.transform(word);
  }


}
