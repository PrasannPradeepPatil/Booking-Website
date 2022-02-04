export class FlightDetails{

    Id: string;
    departureTime: string;
    arrivalTime: string;
    sourceAirportCode: string;
    destinationAirportCode: string;
    price: number;
    duration: number;
    flightName: string;
    flightLogo: string;
    
    constructor(public name: string, public amount: number){}
}