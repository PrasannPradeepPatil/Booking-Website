import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export class DateRange
{
    startDate : NgbDate;
    endDate : NgbDate;

    constructor(startDate: NgbDate, endDate: NgbDate)
    {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}