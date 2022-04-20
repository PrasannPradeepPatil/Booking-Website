export class UserFlightBooking{

    referenceNumber: string;
    bookingDates: string;
    source: string;
    destination: string;
    id: string;
    price: string;
    
    constructor(referenceNumber: string, bookingDates: string, source: string, destination: string, id: string, price: string)
    {
        this.referenceNumber = referenceNumber;
        this.bookingDates = bookingDates;
        this.source = source;
        this.destination = destination;
        this.id = id;
        this.price = price;
    }
}