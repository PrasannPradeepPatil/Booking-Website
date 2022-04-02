import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navButtonChoice: string= "flight"
  loginButtonChoice = "login"

  @Output() messageEvent = new EventEmitter<string>();
  constructor(private router: Router) { }

  ngOnInit(): void {
    
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

  


}
