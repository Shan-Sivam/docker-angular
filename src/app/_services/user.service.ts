import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/user/list`);
    }

    register(user:User) {
      return this.http.post<any>(`${environment.apiUrl}/user/register`, user)
        .pipe(map(newUser => {
          return newUser;
        }));
    }
}
