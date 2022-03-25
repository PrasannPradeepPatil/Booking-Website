import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from './dateRange.model';
export class FlightSearch {
    public source: string;
    public destination: string;
    public startDate: NgbDate;
    public endDate: NgbDate;
    public isRoundTrip: boolean;
    public airlineFilter: string;
    public datatype: string;
    public arrivalTimeFilter: string;
    public departureTimeFilter: string;
    public priceRangeFilter: string;
    public journeyTimeFilter: string;


    constructor(sourceString: string, destinationString: string, startDate: NgbDate, endDate: NgbDate, tripType: string, 
                airlineFilter: string = "", datatype : string = "", arrivalTimeFilter: string = "", departureTimeFilter: string = "", 
                priceRangeFilter: string = "", journeyTimeFilter: string = "")
    {
        this.source = sourceString;
        this.destination = destinationString;
        this.startDate  = startDate;
        this.endDate = endDate;
        this.isRoundTrip = tripType == "true";
        this.airlineFilter = airlineFilter;
        this.datatype = datatype;
        this.arrivalTimeFilter = arrivalTimeFilter;
        this.departureTimeFilter = departureTimeFilter;
        this.priceRangeFilter = priceRangeFilter;
        this.journeyTimeFilter = journeyTimeFilter;
    }

    toString(): string {
        return this.source
            .concat(this.destination)
            .concat(this.startDate.month.toString()).concat('/')
            .concat(this.startDate.day.toString()).concat('/')
            .concat(this.startDate.year.toString()).concat('/')
            .concat(this.endDate.month.toString()).concat('/')
            .concat(this.endDate.day.toString()).concat('/')
            .concat(this.endDate.year.toString()).concat('/')
            .concat(this.isRoundTrip + "");
    }


}
