import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../interfaces/list-equipment';


@Injectable({
  providedIn:'root'
})

export class EquipmentService {
  public urlEndpoint: string = 'http://localhost:3000/equips'
    constructor(private _http: HttpClient) {}

   public getEquipment = (): Observable<Equipment[]> => {
      return this._http.get<Equipment[]>(this.urlEndpoint)
    }
}
