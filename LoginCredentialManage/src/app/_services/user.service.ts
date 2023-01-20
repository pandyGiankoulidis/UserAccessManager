import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const TEST_API = "http://localhost:3080/api/test";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserContent(): Observable<any> {
    return this.http.get(TEST_API + "/user", { responseType: 'text' });
  }

  getAdminContent(): Observable<any> {
    return this.http.get(TEST_API + "/admin", { responseType: 'text' });
  }

  getModeratorContent(): Observable<any> {
    return this.http.get(TEST_API + "/mod", { responseType: 'text' })
  }
}
