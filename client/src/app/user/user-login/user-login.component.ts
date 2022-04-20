import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  loginStatus: string;
  errorMessage: string = "";

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService
      
      // private accountService: AccountService,
      // private alertService: AlertService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          email: ['', [Validators.required,Validators.email]],
          password: ['', Validators.required]
      });
      this.errorMessage = "";

      this.userService.userResponseObservable.subscribe(
          (response) =>
          {
              if(response.loginStatus ==='success')
              {
                  this.router.navigate(['/']);
              }
              else
              {
                  this.errorMessage = "Login Failed! Check your credentials";
                  this.loading = false;
              }
          }
      )
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      // this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.userService.login(this.form.get('email').value, this.form.get('password').value);
  }

}
