import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,FormGroupDirective, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from "../_services/authentication.service";
import {ErrorStateMatcher} from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.dirty || control.touched) && form.invalid;
  }
}
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
    private Router: Router,
    private toastr: ToastrService
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
    },{validators:this.passwordValidator});
  }
  // 
  // get password() {
  //   return this.registerForm.get('rePassword');
  // }
  passwordValidator(form:FormGroup){
    const condition = form.get('password').value!=form.get('rePassword').value
    // console.log("condition",condition);
    return condition ? {passwordDoNotMatched:true}:null;
  }

  // getErrorPassword(){
    
  //   const condition = this.registerForm.get("password")!= this.registerForm.get("rePassword")
  //   console.log("condition",condition);
  //   return this.registerForm.get("password")!== this.registerForm.get("rePassword") ? "password did not match":null
  // }

  ngOnInit() {
    this.route.params.subscribe((params) => this.myParam = params['from']);
  }



  submit() {
    this.authenticationService.login(this.loginForm.value).subscribe(response => {
      if (response.success) {
        console.log("response", response);
        this.Router.navigate([""]);
      }
    },
      (error) => {
        window.alert("Login Credentials Not Matched.")
      });

  }

  onSubmit() {
    // this.submitted = true;
    if (this.registerForm.invalid) {
      console.log("In Hererer");
      return false;
    }

    // this.loading = true;

    this.authenticationService.register(this.registerForm.value).subscribe(response => {
      if (response.success) {
        this.toastr.success('Success!', 'User Added Successfully!');
        this.Router.navigate(["auth/login"]);
      }
    },
      (error) => {
        console.log("error",error)
        window.alert("Login Credentials Not Matched.")
      });
  }
  matcher = new MyErrorStateMatcher();

}
