import { UserService } from './../user/service/user.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navButtonChoice: string= "flight"
  loginButtonChoice = "login"
  userResponse: any;
  isLoggedIn = false;

  @Output() messageEvent = new EventEmitter<string>();
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userResponseObservable.subscribe(
      (response) =>
      {
        this.isLoggedIn = response && response.token !== '';
      }
    )
  }

  sendMessage() {
    this.messageEvent.emit(this.navButtonChoice)
  }

  navigateFlight()
  {
    this.router.navigate(['/flights']);
  }

  navigatehotel()
  {
    this.router.navigate(['/hotels']);
  }

  logout()
  {
    this.userService.logout();
  }


  


}
