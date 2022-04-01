import { User } from 'src/app/protected/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class UserService {
  public urlEndpoint: string = 'http://localhost:3000/users'
    constructor(private _http: HttpClient) {}

   public getUsers = (): Observable<User[]> => {
      return this._http.get<User[]>(this.urlEndpoint)
    }
}
