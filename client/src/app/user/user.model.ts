export class User{

    emailId: string;
    mobileNumber: string;
    firstName: string;
    lastName: string;
    password: string;
    token: string;
    
    constructor(email: string, contact: string, first_name: string, last_name: string, password: string)
    {
        this.emailId = email;
        this.mobileNumber = contact;
        this.firstName = first_name;
        this.lastName = last_name;
        this.password = password;
    }
}