import { Labs } from '../interfaces/labs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LabService {
  public urlEndpoint: string = 'http://localhost:3000/labs';
  constructor(private _http: HttpClient) {}

  public getLabs = (): Observable<Labs[]> => {
    return this._http.get<Labs[]>(this.urlEndpoint);
  };
}
