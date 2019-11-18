import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User | undefined>(localStorage.getItem('currentUser') !== null ? JSON.parse(localStorage.getItem('currentUser')) : undefined);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(data: { username: string, password: string }) {
        return this.http.post<any>(`${environment.apiUrl}/userLogin`, { "emailID": data.username, "password": data.password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(data: { name: string, password: string, emailId: string, DOB: string, rePassword: string }) {
        return this.http.post<any>(`${environment.apiUrl}/userRegistration`, { "name": data.name, "dob": data.DOB, emailID: data.emailId, password: data.password, confirmPassword: data.rePassword })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getList() {
        let userData = JSON.parse(localStorage.getItem('currentUser'));
        console.log("userData",userData);
        return this.http.get<any>(`${environment.apiUrl}/getTask/${userData.data._id}`)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
}