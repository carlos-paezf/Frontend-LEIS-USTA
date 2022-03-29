import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    public isLoading = new Subject<boolean>();


    /**
     * `show` is a function that sets the `isLoading` property to `true`
     */
    public show = (): void => this.isLoading.next(true)


    /**
     * `hide` hides the loading spinner
     */
    public hide = (): void => this.isLoading.next(false)
}