import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/user/login`, { email, password })
          .pipe(
            map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            })
          );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    //private handleError(error: HttpErrorResponse) {

    //  console.log(error);

    //  if (error.error instanceof ErrorEvent) {
    //     A client-side or network error occurred. Handle it accordingly.
    //    console.error('An error occurred:', error.error.message);
    //  } else {
    //     The backend returned an unsuccessful response code.
    //     The response body may contain clues as to what went wrong,
    //    console.log(
    //      `Backend returned code ${error.status}, ` +
    //      `body was: ${error.error}`);
    //  }
    //   return an observable with a user-facing error message
    //  return throwError(
    //    'Something bad happened; please try again later.');
    //};
}
