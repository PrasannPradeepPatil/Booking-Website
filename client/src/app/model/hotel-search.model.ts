import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from './dateRange.model';
export class HotelSearch {
    public hotelLocation: string;
    public startDate: NgbDate;
    public endDate: NgbDate;

    constructor(hotelLocation: string, startDate: NgbDate, endDate: NgbDate)
    {
        this.hotelLocation = hotelLocation;
        this.startDate  = startDate;
        this.endDate = endDate;
    }

    toString(): string {
        return this.hotelLocation
            .concat(this.startDate.month.toString()).concat('/')
            .concat(this.startDate.day.toString()).concat('/')
            .concat(this.startDate.year.toString()).concat('/')
            .concat(this.endDate.month.toString()).concat('/')
            .concat(this.endDate.day.toString()).concat('/')
            .concat(this.endDate.year.toString()).concat('/')
    }


}
