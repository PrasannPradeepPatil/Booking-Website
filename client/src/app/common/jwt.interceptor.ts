import { UserService } from './../user/service/user.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.userService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith("/booking/history");
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    token: user.token,
                    userid: user.userId
                }
            });
        }
        console.log(request.headers);

        return next.handle(request);
    }
}