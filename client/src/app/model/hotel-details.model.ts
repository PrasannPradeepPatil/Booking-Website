import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from './dateRange.model';
export class HotelDetails {
    public City: string;
    public State: string;
    public Hotelname: string;
    public Rating: string;
    public StandardPrice: string;
    public Address : string;
    public Amenities: string



    constructor(City: string, State: string, Hotelname: string, Rating: string, StandardPrice: string, Address: string,Amenities:string)
    {
        this.City = City;
        this.State = State;
        this.Hotelname  = Hotelname;
        this.Rating = Rating;
        this.StandardPrice = StandardPrice;
        this.Address = Address;
        this.Amenities = Amenities;
    }




}