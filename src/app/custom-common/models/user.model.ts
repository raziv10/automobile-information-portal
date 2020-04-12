import {BaseModel} from './base-model';

export class UserModel extends BaseModel {
  id: number;
  username: string;
  email: string;
  password: string;
  image: string;
  roles: string[];
  role: string[];
  location: string;
  resetCode: string;
  token: string;
  access_token: string;
  userIdToken: string;
}
