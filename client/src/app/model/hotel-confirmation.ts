export class HotelConfirmation{

    CodeStatus: string;
    BookingDates:string;
    CustomerName:string;
    EmailAdd:string;
    MobileNumber:string;
    HotelName:string;
    City:string;
    State:string;
    ID: string;
   
   constructor(CodeStatus: string, BookingDates: string, CustomerName: string, EmailAdd: string, 
               MobileNumber: string, HotelName: string, City: string, State: string, ID: string)
   {
       this.CodeStatus = CodeStatus;
       this.BookingDates = BookingDates;
       this.CustomerName = CustomerName;
       this.EmailAdd = EmailAdd;
       this.MobileNumber = MobileNumber;
       this.HotelName = HotelName;
       this.City = City;
       this.State = State;
       this.ID = ID;
   }
}