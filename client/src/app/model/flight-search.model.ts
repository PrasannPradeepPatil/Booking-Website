import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from './dateRange.model';
export class FlightSearch {
    public sourceString: string;
    public destinationString: string;
    public startDate: NgbDate;
    public endDate: NgbDate;
    public tripType: string;

    constructor(sourceString: string, destinationString: string, startDate: NgbDate, endDate: NgbDate, tripType: string)
    {
        this.sourceString = sourceString;
        this.destinationString = destinationString;
        this.startDate  = startDate;
        this.endDate = endDate;
        this.tripType = tripType;
    }

    toString(): string {
        return this.sourceString
            .concat(this.destinationString)
            .concat(this.startDate.month.toString()).concat('/')
            .concat(this.startDate.day.toString()).concat('/')
            .concat(this.startDate.year.toString()).concat('/')
            .concat(this.endDate.month.toString()).concat('/')
            .concat(this.endDate.day.toString()).concat('/')
            .concat(this.endDate.year.toString()).concat('/')
            .concat(this.tripType);
    }


}
