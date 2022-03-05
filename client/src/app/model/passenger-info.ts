export class PassengerInformation{

    Id: string;
    email: string;
    contact: string;
    first_name: string;
    last_name: string;
    gender: string;
    
    constructor(email: string, contact: string, first_name: string, last_name: string, gender: string)
    {
        this.email = email;
        this.contact = contact;
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
    }
}