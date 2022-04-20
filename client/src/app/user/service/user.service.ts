import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../user.model";
import { UserResponse } from '../user-response.model';
import { UserFlightBooking } from '../user-flight-booking.model';
import { UserHotelBooking } from '../user-hotel-booking.model';

@Injectable({providedIn: 'root'})
export class UserService {
    private userSubject : BehaviorSubject < UserResponse >;
    public userResponseObservable : Observable < UserResponse >;
    registerUserURL = "/booking/userRegistration";
    loginURL = "/booking/login";
    flightBookingURL = "/booking/history/postLoginFlight";
    hotelBookingFlight = "/booking/history/postLoginHotel";

    constructor(private http : HttpClient, private router : Router) {
        this.userSubject = new BehaviorSubject<UserResponse>(JSON.parse(localStorage.getItem('userResponse')));
        this.userResponseObservable = this.userSubject.asObservable();
    }

    public get userValue(): UserResponse {
        return this.userSubject.value;
    }

    registerUser(user : User) {
        return this.http.post<any>(this.registerUserURL, user);
    }

    login(email : string, password : string) {
        this.http.post<UserResponse>(this.loginURL, {emailID : email, password : password}).subscribe(
            (response) => 
            {
              localStorage.setItem('userResponse', JSON.stringify(response));
              this.userSubject.next(response);             
            }
        );
    }

    logout() { // remove user from local storage and set current user to null
        localStorage.removeItem('userResponse');
        this.userSubject.next(null);
        this.router.navigate(['/userLogin']);
    }

    getUserFlightBookings(id: string)
    {
        return this.http.post<any>(this.flightBookingURL, {UserId: id});
    }

    getUserHotelBookings(id: string)
    {
        return this.http.post<any>(this.hotelBookingFlight, {UserId: id});
    }
}
