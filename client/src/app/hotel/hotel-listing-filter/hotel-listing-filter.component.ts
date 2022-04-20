import { HotelSearch } from '../../model/hotel-search.model';
import { HotelSearchService } from '../hotel-search/hotel-search.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hotel-listing-filter',
  templateUrl: './hotel-listing-filter.component.html',
  styleUrls: ['./hotel-listing-filter.component.css']
})
export class HotelListingFilterComponent implements OnInit {

  constructor(private hotelSearchService: HotelSearchService) { }

  outboundClicked:boolean = true;
  hotelSearch: HotelSearch;
  hotelFilterForm: FormGroup = new FormGroup({
    rating4Checkbox: new FormControl(false),
    rating3Checkbox: new FormControl(''),
    rating2Checkbox: new FormControl(''),
    rating1Checkbox: new FormControl(''),
    priceRangeCheck1: new FormControl(''),
    priceRangeCheck2: new FormControl(''),
    priceRangeCheck3: new FormControl(''),
    priceRangeCheck4: new FormControl(''),
  });

  minLimit: string;
  maxLimit: string;
  minRating: string;

  ngOnInit(): void {
  }

  onSubmit(hotelFilterForm: FormGroup)
  {
    this.minLimit = "";
    this.maxLimit = "";
    this.minRating = "";
    this.hotelSearch = this.hotelSearchService.getCurrentHotelSearch();
    this.hotelSearch.minrating = "";
    this.hotelSearch.minpriceRange = "";
    this.hotelSearch.maxpricerange ="";


  if(this.hotelFilterForm.get("rating4Checkbox").value)
    this.minRating = "4";
  if(this.hotelFilterForm.get("rating3Checkbox").value)
    this.minRating = "3";
  if(this.hotelFilterForm.get("rating2Checkbox").value)
    this.minRating = "2";
  if(this.hotelFilterForm.get("rating1Checkbox").value)
    this.minRating = "1";

  if(this.hotelFilterForm.get("priceRangeCheck1").value)
    this.minLimit = "150";
  if(this.hotelFilterForm.get("priceRangeCheck2").value)
  {
    this.minLimit = "100";
    this.maxLimit = "150";
  }
  if(this.hotelFilterForm.get("priceRangeCheck3").value)
  {
    this.minLimit = "50";
    this.maxLimit = "100";
  }
  if(this.hotelFilterForm.get("priceRangeCheck4").value)
  {
    this.minLimit = "10";
    this.maxLimit = "50";
  }
  
  if(this.minRating && this.minRating !== "")
    this.hotelSearch.minrating = this.minRating;

    if(this.minLimit && this.minLimit !== "")
    {
      this.hotelSearch.minpriceRange = this.minLimit;
      this.hotelSearch.maxpricerange = this.maxLimit;
    }

  this.hotelSearchService.updateHotelSearch(this.hotelSearch);
  }
}
