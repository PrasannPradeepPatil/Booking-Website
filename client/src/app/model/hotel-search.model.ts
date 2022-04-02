import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from './dateRange.model';
export class HotelSearch {
    public State: string;
    public City: string;
    public Checkin: string;
    public Checkout: string;
    public Pricefilter: string;
    public Rangefilter : string;

    constructor(City: string, State: string, Checkin: string, Checkout: string, Pricefilter: string, Rangefilter: string)
    {
        this.City = City;
        this.State = State;
        this.Checkin  = Checkin;
        this.Checkout = Checkout;
        this.Pricefilter = Pricefilter;
        this.Rangefilter = Rangefilter;
    }




}
