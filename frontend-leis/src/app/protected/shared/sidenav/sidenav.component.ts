import { Component, HostListener, OnInit, Input } from '@angular/core';
import { ITEMS_SIDENAV } from 'src/app/protected/mocks';
import { ItemsMenu } from '../../interfaces';
import { Router } from '@angular/router';
import { ToastrNotificationService } from 'src/app/services';


@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

    @Input() public isCollapsed!: boolean 
    @Input() public showTooltipUser: boolean = false
    public items: ItemsMenu[] = []


    constructor(private _router: Router, private _toastr: ToastrNotificationService) { }


    ngOnInit() {
        this.items = ITEMS_SIDENAV
    }


    /** 
     * A function that is called when the user clicks on the user button. 
     */
    @HostListener('click', ['$event']) onClickUserButton = ($event: any): void => {
        var user_button = document.getElementById('user-button')
        if (user_button?.contains($event.target)) {
            this.showTooltipUser = true
        } else {
            this.showTooltipUser = false
        }
    }


    /**
     * It removes the class is-collapsed from the sidenav element.
     */
    public expand = () => {
        var element = document.getElementById('sidenav')
        element?.classList.remove('is-collapsed')
        this.isCollapsed = false
    }


    /**
     * Add the class 'is-collapsed' to the element with the id 'sidenav'
     */
    public collapse = () => {
        var element = document.getElementById('sidenav')
        element?.classList.add('is-collapsed')
        this.isCollapsed = true
    }


    /**
     * Toggle the sidenav by adding or removing the class is-collapsed
     */
    public toggle = () => {
        var element = document.getElementById('sidenav')
        element?.classList.toggle('is-collapsed')
        this.isCollapsed = !this.isCollapsed
    }


    /**
     * It toggles the class of the element with the id `list-child-` and the button with the id `list-button-`.
     * @param {number} index - The index of the list item that was clicked.
     */
    public selectToggle = (index: number) => {
        var element = document.getElementById(`list-child-${index}`)
        var button = document.getElementById(`list-button-${index}`)
        element?.classList.toggle('select')
        button?.classList.toggle('select')
    }


    /**
     * It toggles the value of the `showTooltipUser` property
     */
    public toggleTooltipUser = (): void => {
        this.showTooltipUser = !this.showTooltipUser
    }


    /**
     * It logs out the user and redirects to the login page.
     */
    public logout = (): void => {
        this._toastr.info('Has cerrado la sesión', 'Adiós')
        this._router.navigate(['auth/login']);
    }
}