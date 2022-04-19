export class User{

    email: string;
    contact: string;
    first_name: string;
    last_name: string;
    password: string;
    token: string;
    
    constructor(email: string, contact: string, first_name: string, last_name: string, password: string)
    {
        this.email = email;
        this.contact = contact;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
    }
}