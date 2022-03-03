import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlightListingFilterService } from './flight-listing-filter.service';


@Component({
  selector: 'app-flight-listing-filter',
  templateUrl: './flight-listing-filter.component.html',
  styleUrls: ['./flight-listing-filter.component.css']
})
export class FlightListingFilterComponent implements OnInit {
  flightFilterForm: FormGroup = new FormGroup({
    outBoundDepartureDuration1: new FormControl(''),
    outBoundDepartureDuration2: new FormControl(''),
    outBoundDepartureDuration3: new FormControl(''),
    outBoundDepartureDuration4: new FormControl(''),
    outBoundArrivalDuration1: new FormControl(''),
    outBoundArrivalDuration2: new FormControl(''),
    outBoundArrivalDuration3: new FormControl(''),
    outBoundArrivalDuration4: new FormControl(''),
  });
  outboundClicked:boolean = true
  flightListingFilterService: FlightListingFilterService;


  constructor(flightListingFilterService: FlightListingFilterService) { 
    this.flightListingFilterService = flightListingFilterService
  }

  
  ngOnInit() {
 
  }

  onSubmit(form: FormGroup) {
    
    let outBoundDepartureRange:string[] = this.getOutBoundDepartureFlightTimeRange()
    let outBoundArrivalRange:string[] = this.getOutBoundArrivalFlightTimeRange()

    // this.flightListingFilterService.postFlightFilters()
    console.log(outBoundDepartureRange)




   

  }

  getOutBoundDepartureFlightTimeRange(){
    let outBoundDepartureRange: string[] = [];

    if(this.flightFilterForm.get("outBoundDepartureDuration1").value == true)
      outBoundDepartureRange.push("12:00 AM-05:59 AM");
    if(this.flightFilterForm.get("outBoundDepartureDuration2").value == true)
      outBoundDepartureRange.push("06:00 AM-11:59 AM");
    if(this.flightFilterForm.get("outBoundDepartureDuration3").value == true)
      outBoundDepartureRange.push("12:00 PM-05:59 PM");
    if(this.flightFilterForm.get("outBoundDepartureDuration4").value == true)
      outBoundDepartureRange.push("06:00 PM-11:59 PM");

    
    return  outBoundDepartureRange


  }

  getOutBoundArrivalFlightTimeRange(){
    let outBoundArrivalRange: string[] = [];

    if(this.flightFilterForm.get("outBoundArrivalDuration1").value == true){
      outBoundArrivalRange.push("12:00 AM-05:59 AM");
    }
    if(this.flightFilterForm.get("outBoundArrivalDuration2").value == true){
      outBoundArrivalRange.push("06:00 AM-11:59 AM");
    }
    if(this.flightFilterForm.get("outBoundArrivalDuration3").value == true){
      outBoundArrivalRange.push("12:00 PM-05:59 PM");
    }
    if(this.flightFilterForm.get("outBoundArrivalDuration4").value == true){
      outBoundArrivalRange.push("06:00 PM-11:59 PM");
    }
    return outBoundArrivalRange


  }






  

}
