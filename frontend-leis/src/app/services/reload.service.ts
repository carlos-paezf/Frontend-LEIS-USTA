import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class ReloadService {

    constructor(private _router: Router) { }

    
    /**
     * The function reloads the current route
     * @param {string} currentUrl - The current URL.
     */
    public reloadCurrentRoute = (currentUrl: string) => {
        this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false
        }
        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this._router.navigated = false
            }
        })
        this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this._router.navigate([currentUrl]);
        });
    }
}