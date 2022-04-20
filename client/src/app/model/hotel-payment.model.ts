export class HotelPayment
{
    CustomerName : string;
    MobileNumber : string;
    EmailAdd : string;

    constructor(CustomerName: string, MobileNumber: string, EmailAdd: string){
        this.CustomerName = CustomerName;
        this.MobileNumber = MobileNumber;
        this.EmailAdd = EmailAdd;
    }
}