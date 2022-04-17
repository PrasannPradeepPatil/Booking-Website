import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from './dateRange.model';
export class FlightSearch {
    public sourceName: string;
    public destinationName: string;
    public startDate: string;
    public endDate: string;
    public isRoundTrip: string;
    public airlineFilter: string;
    public datatype: string;
    public arrivalTimeFilter: string;
    public departureTimeFilter: string;
    public priceRangeFilter: string;
    public journeyTimeFilter: string;
    public maxDurationLimit: string;


    constructor(sourceString: string, destinationString: string, startDate: string, endDate: string, tripType: string, 
                airlineFilter: string = "", datatype : string = "", arrivalTimeFilter: string = "", departureTimeFilter: string = "", 
                priceRangeFilter: string = "", journeyTimeFilter: string = "", maxDurationLimit: string = "")
    {
        this.sourceName = sourceString;
        this.destinationName = destinationString;
        this.startDate  = startDate;
        this.endDate = endDate;
        this.isRoundTrip = tripType;
        this.airlineFilter = airlineFilter;
        this.datatype = datatype;
        this.arrivalTimeFilter = arrivalTimeFilter;
        this.departureTimeFilter = departureTimeFilter;
        this.priceRangeFilter = priceRangeFilter;
        this.journeyTimeFilter = journeyTimeFilter;
        this.maxDurationLimit = maxDurationLimit;
    }

    toString(): string {
        return this.sourceName
            .concat(this.destinationName)
            .concat(this.startDate)
            .concat(this.endDate)
            .concat(this.isRoundTrip + "");
    }


}
