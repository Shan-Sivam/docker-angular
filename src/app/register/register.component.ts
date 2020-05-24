import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService } from '../_services';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models';
import { first } from 'rxjs/operators';
import { CustomValidators } from '../_helpers/custom-validators';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  newlyCreatedUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmedPassword: ['', RxwebValidators.compare({ fieldName: 'password' })]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  get password(): any { return this.registerForm.get('password').value };

  get currentUser(): any { return this.authService.currentUserValue; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    var user: User = new User();
    user.firstName = this.registerForm.get('firstName').value;
    user.lastName = this.registerForm.get('lastName').value;
    user.email= this.registerForm.get('email').value;
    user.password = this.registerForm.get('password').value;

    this.userService.register(user)
      .pipe(first())
      .subscribe(newUser => {
          console.log(newUser);
          this.newlyCreatedUser = newUser
        },
        httpError => {
          this.error = httpError;
          this.loading = false;
        });
  }

  pwdMatchValidator(frm: FormGroup) {
    console.log('password validator triggered');

    var pwd = frm.get('password').value;
    var pwdConfirm = frm.get('confirmedPassword').value;

    console.log('pwd: ' + pwd + ', confirm: ' + pwdConfirm);

    if (pwd === pwdConfirm) {
      return null;
    } 

    return  { 'mismatch': true };
  }


  private validateAreEqual(fieldControl: FormControl, passwordEntered: any) {

    return fieldControl.value === passwordEntered ? null : {
      NotEqual: true
    };
  }

}
