import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from './dateRange.model';
export class HotelListing {
    public State: string;
    public City: string;
    public Hotelname: string;
    public Rating: string;
    public Standardprice: string;
    public ID : string;

    constructor(City: string, State: string, Hotelname: string, Rating: string, Standardprice: string, ID: string)
    {
        this.City = City;
        this.State = State;
        this.Hotelname  = Hotelname;
        this.Rating = Rating;
        this.Standardprice = Standardprice;
        this.ID = ID;
    }




}