export class FlightInDetails{

    Id: string;
    departureTime: string;
    arrivalTime: string;
    sourceAirportCode: string;
    sourceAirportName: string;
    destinationAirportCode: string;
    destinationAirportName: string;
    price: number;
    duration: number;
    flightName: string;
    flightLogo: string;
    
    constructor(public name: string, public amount: number){}
}