export class FlightListingFilter{

 
    sourceName: string;
    destinationName: string;
    Checkin: string;
    Checkout: string;
    isRoundTrip: boolean;
    AirlineFilter: string; 
    ArrivalTimeFilter:string; 
    DepartureTimeFilter:string; 
    PriceRangeFilter:string; 
    JourneyTimeFilter:string; 
    
    constructor(sourceName:string,destinationName: string,Checkin: string,Checkout:string,isRoundTrip: boolean, AirlineFilter: string,  ArrivalTimeFilter: string,DepartureTimeFilter: string,PriceRangeFilter:string,JourneyTimeFilter: string ){

        this.sourceName = sourceName;
        this.destinationName = destinationName;
        this.Checkin = Checkin;
        this.Checkout = Checkout;
        this.isRoundTrip = isRoundTrip;
        this.AirlineFilter = AirlineFilter;
        this.ArrivalTimeFilter = ArrivalTimeFilter;
        this.DepartureTimeFilter = DepartureTimeFilter;
        this.PriceRangeFilter = PriceRangeFilter;
        this.JourneyTimeFilter = JourneyTimeFilter;
    }



   
}

