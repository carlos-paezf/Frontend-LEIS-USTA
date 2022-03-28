import { Component, Input } from '@angular/core';
import { MsgGeneric } from '../../interfaces';


@Component({
    selector: 'app-breadcrumb-messages',
    templateUrl: './breadcrumb-messages.component.html',
    styleUrls: ['./breadcrumb-messages.component.css']
})
export class BreadcrumbMessagesComponent {

    @Input() unreadMessages!: number
    @Input() messages!: MsgGeneric[]

}
