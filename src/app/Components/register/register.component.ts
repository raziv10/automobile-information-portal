import { Component, OnInit } from '@angular/core';
import {RegisterModel} from '../../custom-common/models/register.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../custom-common/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../login/login-service/login.service';
import {AuthService} from '../_common-services/auth-service/auth.service';
import {RegisterService} from './register-service/register.service';
import {HttpParams} from '@angular/common/http';
import {ApiConst} from '../../ApiConstants/api-const';
import swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private  registerModel: RegisterModel;
  userForm: FormGroup;
  error;
  errorMessage: string;
  sucess: boolean;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private registerService: RegisterService,
            ) { }

  ngOnInit() {
    this.registerModel = new RegisterModel();
    this.inOnInit();
  }
  inOnInit(){
    this.userForm = new FormGroup({});
    this.userForm = this.formBuilder.group({
      username: [this.registerModel.username, [Validators.required]],
      email: [this.registerModel.email, [Validators.required]],
      confirm_email: [this.registerModel.confirmemail, [Validators.required]],
      password: [this.registerModel.password, [Validators.required]],
      confirm_password: [this.registerModel.confirmpassword, [Validators.required]],
    });

  }
  submit() {
    if(this.userForm.valid){
      const body = new HttpParams()
        .set('username', this.userForm.get('username').value)
        .set('email', this.userForm.get('email').value)
        .set('email2', this.userForm.get('confirm_email').value)
        .set('password', this.userForm.get('password').value)
        .set('password2', this.userForm.get('confirm_password').value);
      this.registerService.postRegisterRequest(
        body.toString(), ApiConst.REGISTER)
        .subscribe(
          data => {
            console.log(data.token);
            if (data) {
              console.log(data);
              swal.fire("Sucess!", 'Register sucessfull' , "success");
            }
          }, error => {
            console.log(error);
            if (error.error.username !== undefined ) {
              swal.fire("Username!", error.error.username[0], "error");
              console.log(error.error.username);

            } else if(error.error.password !== undefined){
              console.log(error.error.password);
              swal.fire("Password!", error.error.password[0], "error");
            }
            else if(error.error.email !== undefined) {
                swal.fire("Email!", error.error.email[0], "error");
              }
          }
        );
      console.log(this.userForm.getRawValue());
    }else{
      swal.fire("Empty Fields!", 'Fields cannot be empty', "error");
    }

  }
}
