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
}