import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from './dateRange.model';
export class FlightSearch {
    public sourceString: string;
    public destinationString: string;
    public Checkin: NgbDate;
    public Checkout: NgbDate;
    public tripType: string;

    constructor(sourceString: string, destinationString: string, Checkin: NgbDate, Checkout: NgbDate, tripType: string)
    {
        this.sourceString = sourceString;
        this.destinationString = destinationString;
        this.Checkin  = Checkin;
        this.Checkout = Checkout;
        this.tripType = tripType;
    }

    toString(): string {
        return this.sourceString
            .concat(this.destinationString)
            .concat(this.Checkin.month.toString()).concat('/')
            .concat(this.Checkin.day.toString()).concat('/')
            .concat(this.Checkin.year.toString()).concat('/')
            .concat(this.Checkout.month.toString()).concat('/')
            .concat(this.Checkout.day.toString()).concat('/')
            .concat(this.Checkout.year.toString()).concat('/')
            .concat(this.tripType);
    }


}
