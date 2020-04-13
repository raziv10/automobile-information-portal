import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../../custom-common/models/user.model';
import {HttpParams} from '@angular/common/http';
import {LoginService} from './login-service/login.service';
import {ApiConst} from '../../ApiConstants/api-const';
import {AuthService} from '../_common-services/auth-service/auth.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  private userModel: UserModel;
  error;
  errorMessage: string;
  sucess: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userModel = new UserModel();
    this.inOnInit();

  }

  inOnInit() {
    this.userForm = new FormGroup({});
    this.userForm = this.formBuilder.group({
      username: [this.userModel.username, [Validators.required]],
      password: [this.userModel.password, [Validators.required]],
    });
  }


  submit() {
    if(this.userForm.valid) {
      const body = new HttpParams()
        .set('username', this.userForm.get('username').value)
        .set('password', this.userForm.get('password').value)
        .set('grant_type', 'password');
      const token = new HttpParams()
        .set('username', this.userForm.get('username').value)
        .set('password', this.userForm.get('password').value);
      this.loginService.postAuthRequest(
        body.toString(), 'users/login/')
        .subscribe(
          data => {
            console.log(data.token);
            if (data) {
              localStorage.setItem('current-active-user',data.username);
              localStorage.setItem('current-active-user-id',data.userIdToken);
              this.loginService.postAuthToken(
                token.toString(), ApiConst.TOKEN)
                .subscribe(
                  response => {
                    if(response){
                      this.authService.setToken(response.token);
                      data.token = response.token;
                      swal.fire("Sucess!", 'Login sucessfull' , "success");
                      setTimeout(()=>{
                        window.location.reload();

                      },1000);

                    }
                    this.router.navigate(['']);
                  }
                );
              console.log(data);
            }
          }, error => {
            console.log(error);
            if (error.error.non_field_errors) {
              swal.fire("Error!", error.error.non_field_errors[0] , "error");
              console.log(error.error.non_field_errors[0]);
            } else {
              console.log(error);
              swal.fire("Error!", 'Invalid Email', "error");
              console.log(error.error.email);
            }
          }
        );
    }else{
      swal.fire("Empty Fields!", 'Fields cannot be empty', "error");
    }

    console.log(this.userForm.getRawValue());
  }

  forgotPassword() {
    document.location.href = 'http://127.0.0.1:8000/api/users/password_reset/';
  }
}
