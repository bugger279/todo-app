import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  API_URL =  'http://180.149.241.208:3022/' ;

  constructor(private http: HttpClient) { }

  loginpost(data): Observable<any> {
   return this.http.post(this.API_URL + 'userLogin', { "emailID": data.username, "password":  data.password });
  }
}