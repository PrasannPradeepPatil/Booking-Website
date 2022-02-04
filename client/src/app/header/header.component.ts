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
  constructor() { }

  ngOnInit(): void {
    
  }

  sendMessage() {
    this.messageEvent.emit(this.navButtonChoice)
  }

  


}
