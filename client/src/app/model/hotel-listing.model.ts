import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from './dateRange.model';
export class HotelListing {
    public state: string;
    public city: string;
    public hotelName: string;
    public rating: string;
    public standardPrice: string;
    public id : string;

    constructor(City: string, State: string, Hotelname: string, Rating: string, Standardprice: string, ID: string)
    {
        this.city = City;
        this.state = State;
        this.hotelName  = Hotelname;
        this.rating = Rating;
        this.standardPrice = Standardprice;
        this.id = ID;
    }




}