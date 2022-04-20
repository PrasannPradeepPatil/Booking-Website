export class UserHotelBooking{

    referenceNumber: string;
    bookingDates: string;
    city: string;
    state: string;
    id: string;
    price: string;
    hotelName: string;
    
    constructor(referenceNumber: string, bookingDates: string, city: string, state: string, id: string, price: string, hotelName: string)
    {
        this.referenceNumber = referenceNumber;
        this.bookingDates = bookingDates;
        this.city = city;
        this.state = state;
        this.id = id;
        this.price = price;
        this.hotelName = hotelName;
    }
}