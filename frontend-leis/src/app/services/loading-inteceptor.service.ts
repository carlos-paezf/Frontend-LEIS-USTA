import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services';


@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

    constructor(private _loadingService: LoadingService) { }


    /**
     * This interceptor will show a loading spinner while the request is in progress
     * @param req - HttpRequest<any>
     * @param {HttpHandler} next - HttpHandler
     * @returns An observable of the HttpEvent type.
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loadingService.show()
        return next.handle(req)
            .pipe(finalize(() => this._loadingService.hide()))
    }
}
