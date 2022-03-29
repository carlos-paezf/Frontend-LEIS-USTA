import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input } from '@angular/core';
import { MsgGeneric } from 'src/app/protected/interfaces';


@Component({
    selector: 'app-card-info',
    templateUrl: './card-info.component.html',
    styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent {

    @Input() public title!: string
    @Input() public messages!: MsgGeneric[]
    @Input() public unreadMessages: number = 0
    @Input() public idCard!: string

    public idButton: string = `button-${this.idCard}`
    public showButton: boolean = false 


    constructor(@Inject(DOCUMENT) private _document: Document) { }


    /** 
     * A way to detect when the user scrolls down the card. 
     */
    @HostListener('scroll', ['$event']) onWindowScroll = (): void => {
        this.showButton = (this._document.getElementById(this.idCard)!.scrollTop > 1000) ? true : false
    }


    /**
     * It sets the scrollTop of the element with the id of idCard to 0.
     */
    public onScrollTop = (): void => {
        var element = document.getElementById(this.idCard) 
        element!.scrollTop = 0
    }
}