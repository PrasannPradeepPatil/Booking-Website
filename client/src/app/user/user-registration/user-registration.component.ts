import { UserService } from '../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  user: User ;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          contact: ['', Validators.required],
          email: ['', Validators.required, Validators.email],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {

    this.user = new User(this.form.get('email').value, this.form.get('contact').value, this.form.get('firstName').value, 
                         this.form.get('lastName').value, this.form.get('password').value);

    this.userService.registerUser(this.user).subscribe(
      (response) =>
      {

      }
    );
      // this.submitted = true;

      // // reset alerts on submit
      // this.alertService.clear();

      // // stop here if form is invalid
      // if (this.form.invalid) {
      //     return;
      // }

      // this.loading = true;
      // this.accountService.register(this.form.value)
      //     .pipe(first())
      //     .subscribe({
      //         next: () => {
      //             this.alertService.success('Registration successful', { keepAfterRouteChange: true });
      //             this.router.navigate(['../login'], { relativeTo: this.route });
      //         },
      //         error: error => {
      //             this.alertService.error(error);
      //             this.loading = false;
      //         }
      //     });
  }

}
