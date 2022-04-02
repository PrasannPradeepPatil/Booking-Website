export class FlightListingFilter{

 
    sourceName: string;
    destinationName: string;
    startDate: string;
    endDate: string;
    isRoundTrip: boolean;
    AirlineFilter: string; 
    ArrivalTimeFilter:string; 
    DepartureTimeFilter:string; 
    PriceRangeFilter:string; 
    JourneyTimeFilter:string; 
    
    constructor(sourceName:string,destinationName: string,startDate: string,endDate:string,isRoundTrip: boolean, AirlineFilter: string,  ArrivalTimeFilter: string,DepartureTimeFilter: string,PriceRangeFilter:string,JourneyTimeFilter: string ){

        this.sourceName = sourceName;
        this.destinationName = destinationName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isRoundTrip = isRoundTrip;
        this.AirlineFilter = AirlineFilter;
        this.ArrivalTimeFilter = ArrivalTimeFilter;
        this.DepartureTimeFilter = DepartureTimeFilter;
        this.PriceRangeFilter = PriceRangeFilter;
        this.JourneyTimeFilter = JourneyTimeFilter;
    }



   
}

