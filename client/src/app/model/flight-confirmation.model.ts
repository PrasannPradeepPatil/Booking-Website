export class FlightConfirmation{

     CodeStatus: string;
	 BookingDates:string;
	 CustomerName:string;
	 EmailAdd:string;
	 MobileNumber:string;
	 Source:string;
	 Destination:string;
	 ID:string;
    
    constructor(CodeStatus: string, BookingDates: string, CustomerName: string, EmailAdd: string, 
                MobileNumber: string, Source: string, Destination: string, ID: string)
    {
        this.CodeStatus = CodeStatus;
        this.BookingDates = BookingDates;
        this.CustomerName = CustomerName;
        this.EmailAdd = EmailAdd;
        this.MobileNumber = MobileNumber;
        this.Source = Source;
        this.Destination = Destination;
        this.ID = ID;
    }
}