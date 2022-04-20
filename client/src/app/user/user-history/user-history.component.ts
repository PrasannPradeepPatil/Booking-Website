import { UserFlightBooking } from '../user-flight-booking.model';
import { UserService } from '../service/user.service';
import { Component, OnInit } from '@angular/core';
import { UserHotelBooking } from '../user-hotel-booking.model';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  constructor(private userService: UserService) { }

  navButtonChoice: string= "flight"
  userFlightBookings: UserFlightBooking[];
  userHotelBookings: UserHotelBooking[];
  userId: string;


  ngOnInit(): void {

    this.userService.userResponseObservable.subscribe(
      (response) =>
      {
        this.userId = response.userId
        this.userService.getUserFlightBookings(response.userId).subscribe(response => {
          this.userFlightBookings = response.response;
        });

        this.userService.getUserHotelBookings(response.userId).subscribe(response =>{
          this.userHotelBookings = response.response;
        })
      }
    )
    
  }

  selectFlightBooking()
  {
    this.navButtonChoice= 'flight';
    this.userService.getUserFlightBookings(this.userId).subscribe(response => {
      this.userFlightBookings = response.response;
    });
  }

  selectHotelBooking()
  {
    this.navButtonChoice= 'hotel';
    this.userService.getUserHotelBookings(this.userId).subscribe(response => {
      this.userHotelBookings = response.response;
    });
  }

}
