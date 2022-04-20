import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from './dateRange.model';
export class HotelDetails {
    public city: string;
    public state: string;
    public hotelName: string;
    public rating: string;
    public standardPrice: string;
    public address : string;
    public amenities: string



    constructor(City: string, State: string, Hotelname: string, Rating: string, StandardPrice: string, Address: string,Amenities:string)
    {
        this.city = City;
        this.state = State;
        this.hotelName  = Hotelname;
        this.rating = Rating;
        this.standardPrice = StandardPrice;
        this.address = Address;
        this.amenities = Amenities;
    }




}