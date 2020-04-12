import {BaseModel} from './base-model';

export class RegisterModel extends BaseModel{
  username: string;
  email: string;
  confirmemail: string;
  password : string;
  confirmpassword: string;
}
