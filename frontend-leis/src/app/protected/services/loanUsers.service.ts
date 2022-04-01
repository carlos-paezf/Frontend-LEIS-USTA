import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../interfaces/loan-users';


@Injectable({
  providedIn:'root'
})

export class LoanService {
  public urlEndpoint: string = 'http://localhost:3000/loan'
    constructor(private _http: HttpClient) {}

   public getLoan = (): Observable<Loan[]> => {
      return this._http.get<Loan[]>(this.urlEndpoint)
    }
}
