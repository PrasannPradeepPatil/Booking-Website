export class FlightDetails{

    id: string;
    departureTime: string;
    arrivalTime: string;
    sourceAirportCode: string;
    sourceAirportName: string;
    destinationAirportCode: string;
    destinationAirportName: string;
    price: number;
    duration: number;
    flightName: string;
    logo: string;
    sourceAirport : string;
    destinationAirport : string;
    sourceCity: string;
    destinationCity: string;
    standardPrice: number;
    flexiblePrice: number;
    ticketType: string;
    
    constructor(public name: string, public amount: number){}
}