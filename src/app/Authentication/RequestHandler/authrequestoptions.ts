import { Headers, Http, BaseRequestOptions } from '@angular/http';


const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'JWT';

// @ts-ignore
export class AuthRequestOptions extends BaseRequestOptions {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor() {
    super();

    const token = localStorage.getItem('token');
    if(token) {
      this.headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
    }
  }

}
