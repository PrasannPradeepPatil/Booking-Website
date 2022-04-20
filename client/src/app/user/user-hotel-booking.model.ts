export class UserHotelBooking{

    Referencenumber: string;
    bookingdates: string;
    city: string;
    state: string;
    id: string;
    price: string;
    hotelName: string;
    
    constructor(referenceNumber: string, bookingDates: string, city: string, state: string, id: string, price: string, hotelName: string)
    {
        this.Referencenumber = referenceNumber;
        this.bookingdates = bookingDates;
        this.city = city;
        this.state = state;
        this.id = id;
        this.price = price;
        this.hotelName = hotelName;
    }
}