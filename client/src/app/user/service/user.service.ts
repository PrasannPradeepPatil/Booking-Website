import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../user.model";

@Injectable({providedIn: 'root'})
export class UserService {
    private userSubject : BehaviorSubject < User >;
    public user : Observable < User >;
    registerUserURL = "/booking/userRegistration";

    constructor(private http : HttpClient, private router : Router) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    registerUser(user : User) {
        return this.http.post<any>(this.registerUserURL, user);
    }

    login(email : string, password : string) {
        return this.http.post<User>('/users/authenticate', {email, password}).pipe(map(user => { // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
    }

    logout() { // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}
