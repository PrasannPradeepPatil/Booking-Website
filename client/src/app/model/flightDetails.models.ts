export class FlightDetails{

    id: string;
    departuretime: string;
    arrivaltime: string;
    sourceAirportCode: string;
    sourceAirportName: string;
    destinationAirportCode: string;
    destinationAirportName: string;
    price: number;
    duration: number;
    flightName: string;
    logo: string;
    sourceairport : string;
    destinationairport : string;
    
    constructor(public name: string, public amount: number){}
}