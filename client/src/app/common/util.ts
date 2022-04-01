import { Injectable } from "@angular/core";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class Util
{
    transform(value:string): string {
        let rest = value.substr(1).toLowerCase();
        return value.substr(0,1) + rest; 
      }


    getTaxes(price: number)
    {
        return price * 0.05;
    }

    getAirlineFees(price: number)
    {
        return price * 0.1;
    }

    getTotalFare(price: number) : number
    {
        return Number(price) + (price*0.05) + (price*0.1);
    }
}