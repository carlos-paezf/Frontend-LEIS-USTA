import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services';


@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

    public isLoading = this._loadingService.isLoading

    constructor(private _loadingService: LoadingService) { }
}
