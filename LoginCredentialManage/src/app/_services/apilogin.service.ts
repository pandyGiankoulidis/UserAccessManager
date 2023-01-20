import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = "http://localhost:3080/api/auth";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class APILoginService {

  constructor(private http: HttpClient) {
  }

  login(username: String, password: String): Observable<any> {
    return this.http.post(AUTH_API + "/signin", { username, password }, httpOptions);
  }

  signup(uname: String, pword: String, eml: String, ag: String, rols: [String]): Observable<any> {
    return this.http.post(AUTH_API + "/signup", { username: "" + uname, password: pword, email: eml, age: ag, roles: rols }, httpOptions);
  }

  reset(email: String, password: String): Observable<any> {
    return this.http.post(AUTH_API + "/reset", { email, password }, httpOptions);
  }
}
