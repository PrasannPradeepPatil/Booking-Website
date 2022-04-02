import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export class DateRange
{
    Checkin : NgbDate;
    Checkout : NgbDate;

    constructor(Checkin: NgbDate, Checkout: NgbDate)
    {
        this.Checkin = Checkin;
        this.Checkout = Checkout;
    }
}