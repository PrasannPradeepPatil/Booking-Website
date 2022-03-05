import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-stage1',
  templateUrl: './payment-stage1.component.html',
  styleUrls: ['./payment-stage1.component.css']
})
export class PaymentStage1Component implements OnInit {

  constructor(private router: Router ) { }

  selectedTicketType: string;

  ngOnInit(): void {
  }


  selectTicketType(input: string)
  {
    console.log(input);
    this.selectedTicketType = input;
  }

  getTicketType()
  {
    return this.selectTicketType;
  }

  next()
  {
    this.router.navigate(['/payment']);
  }
}
