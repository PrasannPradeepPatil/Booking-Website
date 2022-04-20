import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from './dateRange.model';
export class HotelSearch {
    public State: string;
    public City: string;
    public Checkin: string;
    public Checkout: string;
    public Pricefilter: string;
    public Ratingfilter : string;
    public minrating: string;
    public minpriceRange: string;
    public maxpricerange: string

    constructor(City: string, State: string, Checkin: string, Checkout: string, Pricefilter: string, 
                Rangefilter: string, minrating?: string, minpriceRange?: string, maxpricerange?: string)
    {
        this.City = City;
        this.State = State;
        this.Checkin  = Checkin;
        this.Checkout = Checkout;
        this.Pricefilter = Pricefilter;
        this.Ratingfilter = Rangefilter;
        this.minrating = minrating;
        this.minpriceRange = minpriceRange;
        this.maxpricerange = maxpricerange;
    }




}
