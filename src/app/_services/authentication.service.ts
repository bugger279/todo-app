import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { TaskServiceService } from './task-service.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private taskservice: TaskServiceService) {
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
                this.taskservice.setLoginStatus(true);
                return user;
            }));
    }

    register(data: { name: string, password: string, emailId: string, DOB: string, rePassword: string }) {
        return this.http.post<any>(`${environment.apiUrl}/userRegistration`, { "name": data.name, "dob": data.DOB, emailID: data.emailId, password: data.password, confirmPassword: data.rePassword })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(user));
                //this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.taskservice.setLoginStatus(false);
    }

    getList() {
        let userData = JSON.parse(localStorage.getItem('currentUser'));
        if (userData) {
            return this.http.get<any>(`${environment.apiUrl}/getTask/${userData.data._id}`)
                .pipe(map(user => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                }));
        }
    }

    addTask(data: { taskname: string, priority: string, startDate: string, endDate: string, comments: string }) {
        let userData = JSON.parse(localStorage.getItem('currentUser'));

        let header = new HttpHeaders()
        header.append('Authorization', userData.token);
        header.append('Content-Type', 'application/json');

        return this.http.post<any>(`${environment.apiUrl}/createTask`, { "userID": userData.data._id, "taskname": data.taskname, priority: data.priority, startDate: data.startDate, endDate: data.endDate, comments: data.comments },
            {
                headers: {
                    'Authorization': 'Bearer ' + userData.token,
                    'Content-Type': 'application/json'
                }
            }
        )
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    updateTask(data: { _id: string, taskname: string, priority: string, startDate: string, endDate: string, comments: string }) {
        let userData = JSON.parse(localStorage.getItem('currentUser'));

        let header = new HttpHeaders()
        header.append('Authorization', userData.token);
        header.append('Content-Type', 'application/json');

        return this.http.put<any>(`${environment.apiUrl}/updateTask?userID=${userData.data._id}&_id=${data._id}`, { "_id": data._id, "userID": userData.data._id, "taskname": data.taskname, priority: data.priority, startDate: data.startDate, endDate: data.endDate, comments: data.comments },
            {
                headers: {
                    'Authorization': 'Bearer ' + userData.token,
                    'Content-Type': 'application/json'
                }
            }
        )
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    deleteTask(data: { _id: string }) {
        let userData = JSON.parse(localStorage.getItem('currentUser'));

        let header = new HttpHeaders()
        header.append('Authorization', userData.token);
        header.append('Content-Type', 'application/json');

        return this.http.delete<any>(`${environment.apiUrl}/deleteTask?userID=${userData.data._id}&_id=${data._id}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + userData.token,
                    'Content-Type': 'application/json'
                }
            }
        )
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
}