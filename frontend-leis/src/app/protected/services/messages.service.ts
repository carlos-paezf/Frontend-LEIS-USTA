import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MsgGeneric } from '../interfaces';


@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    public urlEndpoint: string = 'http://localhost:3000/messages'


    constructor(private _http: HttpClient) { }


    /**
     * It returns an Observable of type MsgGeneric[]
     * @returns An Observable of type MsgGeneric[]
     */
    public getMessages = (): Observable<MsgGeneric[]> => {
        return this._http.get<MsgGeneric[]>(this.urlEndpoint)
    }


    /**
     * It returns an Observable of type MsgGeneric.
     * @param {string} id - string
     * @returns An Observable of type MsgGeneric.
     */
    public getMessageByID = (id: string): Observable<MsgGeneric> => {
        return this._http.get<MsgGeneric>(`${this.urlEndpoint}/${id}`)
    }


    /**
     * It returns an Observable of type MsgGeneric[]
     * @param {string} category - string
     * @returns An Observable of type MsgGeneric[]
     */
    public getMessagesByCategory = (category: string): Observable<MsgGeneric[]> => {
        const params = new HttpParams()
            .set('q', `${category}`)
            .set('_limit', '25')
        return this._http.get<MsgGeneric[]>(this.urlEndpoint, { params })
    }


    /**
     * It creates a message and sends it to the server.
     * @param {MsgGeneric} msg - MsgGeneric is the message that we want to send to the server.
     * @returns An Observable of type MsgGeneric
     */
    public createMessage = (msg: MsgGeneric): Observable<MsgGeneric> => {
        return this._http.post<MsgGeneric>(this.urlEndpoint, msg)
    }


    /**
     * It updates a message.
     * @param {MsgGeneric} msg - MsgGeneric is the message that we want to update.
     * @returns An Observable of type MsgGeneric.
     */
    public updateMessage = (msg: MsgGeneric): Observable<MsgGeneric> => {
        return this._http.put<MsgGeneric>(`${this.urlEndpoint}/${msg.id}`, msg)
    }


    /**
     * It deletes a message from the server.
     * @param {string} id - The id of the message to delete.
     * @returns The observable of the response from the server.
     */
    public deleteMessage = (id: string): Observable<MsgGeneric> => {
        return this._http.delete<MsgGeneric>(`${this.urlEndpoint}/${id}`)
    }
}