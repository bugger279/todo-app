import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { passwordValidator } from '../password-validator';
// import { CommonService } from '../_services/common.service';
import { AuthenticationService } from "../_services/authentication.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = "";
  hasError = false;
  myParam: string;
  submitted = false;
  loading = false;
  registerForm: FormGroup;
  loginForm: FormGroup;
  maxDate = (new Date().getFullYear()).toString() + "-0" + (new Date().getMonth() + 1).toString() + "-" + (new Date().getDate()).toString();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private Router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      DOB: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(7),
      Validators.maxLength(35),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,35}$/)]),
      rePassword: new FormControl('', [Validators.required])
    }, {validators:this.passwordValidator});
  }
  get password() {
    return this.registerForm.get('rePassword');
  }
  passwordValidator(form:FormGroup){
    const condition = form.get('password').value!==form.get('rePassword').value
    return condition ? {passwordDoNotMatched:true}:null;
  }
  getErrorMessage() {
    console.log("this.registerForm.get(rePassword)", this.registerForm.get("rePassword"));
    return this.registerForm.get("rePassword").hasError("required")
      ? "You must enter a value"
      : this.registerForm.get("rePassword").hasError("passwordNotMatched")
        ? "Not a valid password"
        : "";
  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.myParam = params['from']);
    // this.registerForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   emailId: ['', Validators.required, Validators.email],
    //   DOB: ['', Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(7),
    //     Validators.maxLength(35),
    //     Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,35}$/)]]
    // });
  }



  submit() {
    // console.log("this.form", this.form.value);
    // if (this.loginForm.value.username == "") {
    //   this.error = "Please enter username";
    //   this.hasError = true;
    //   // this.submitEM.emit(this.form.value);
    // }
    // if (this.loginForm.value.password == "") {
    //   this.error = "Please enter password";
    //   this.hasError = true;
    //   console.log("in else");
    // }

    this.authenticationService.login(this.loginForm.value).subscribe(response => {
      if (response.success) {
        // this.commonService.loginpost(this.loginForm.value.username, this.loginForm.value.password).subscribe((response) => {
        console.log("response", response);
        // localStorage.setItem('loggedIn--->', "true");
        // localStorage.setItem('userDetails', JSON.stringify(response));
        // this.loginSuccessful.emit('Logged In');
        this.Router.navigate([""]);
        // }
      }
    },
      (error) => {
        window.alert("Login Credentials Not Matched.")
      });

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log("In Hererer");
      return;
    }

    this.loading = true;

    this.authenticationService.register(this.registerForm.value).subscribe(response => {
      if (response.success) {
        // this.commonService.loginpost(this.loginForm.value.username, this.loginForm.value.password).subscribe((response) => {
        console.log("response", response);
        // localStorage.setItem('loggedIn--->', "true");
        // localStorage.setItem('userDetails', JSON.stringify(response));
        // this.loginSuccessful.emit('Logged In');
        this.Router.navigate(["auth/login"]);
        // }
      }
    },
      (error) => {
        window.alert("Login Credentials Not Matched.")
      });
    // this.userService.register(this.registerForm.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.alertService.success('Registration successful', true);
    //             this.router.navigate(['/login']);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });
  }
  // @Input() error: string | null;

  // @Output() submitEM = new EventEmitter();

}
