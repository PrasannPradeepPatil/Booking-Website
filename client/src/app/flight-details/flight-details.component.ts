import { FlightDetails } from './../model/flightDetails.models';
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
    })
    // this.flightDetails =this.flightSearchService.getFlightsById(this.flight_id);
  }

  closeResult: string;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, private flightSearchService: FlightSearchService, private router: Router) {}

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
  

  // openBackDropCustomClass(content: any) {
  //   this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  // }

  // openWindowCustomClass(content) {
  //   this.modalService.open(content, { windowClass: 'dark-modal' });
  // }

  // openSm(content) {
  //   this.modalService.open(content, { size: 'sm' });
  // }

  // openLg(content) {
  //   this.modalService.open(content, { size: 'lg' });
  // }

  openXl(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  // openVerticallyCentered(content) {
  //   this.modalService.open(content, { centered: true });
  // }

  // openScrollableContent(longContent) {
  //   this.modalService.open(longContent, { scrollable: true });
  // }

  // openModalDialogCustomClass(content) {
  //   this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  // }

}
