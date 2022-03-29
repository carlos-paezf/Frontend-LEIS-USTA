import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MsgGeneric } from 'src/app/protected/interfaces';
import { MessagesService } from 'src/app/protected/services';
import { ReloadService, ToastrNotificationService } from 'src/app/services';


@Component({
    selector: 'app-card-info-content',
    templateUrl: './card-info-content.component.html',
    styleUrls: ['./card-info-content.component.css']
})
export class CardInfoContentComponent {

    @Input() msg!: MsgGeneric


    constructor(
        private _msgService: MessagesService,
        private _toastrService: ToastrNotificationService,
        private _router: Router,
        private _reload: ReloadService) { }


    /**
     * Toggle the check property of the message object and update the message in the database
     */
    public toggleCheck = () => {
        this._msgService.updateMessage({ ...this.msg, check: !this.msg.check })
            .subscribe(_ => {
                const alert = this.msg.check ? 'Mensaje marcado como no leído' : 'Mensaje marcado como leído'
                this._toastrService.info(alert, 'Información')
                this._reload.reloadCurrentRoute(this._router.url)
                // this._document.location.reload()
            })
    }
}
