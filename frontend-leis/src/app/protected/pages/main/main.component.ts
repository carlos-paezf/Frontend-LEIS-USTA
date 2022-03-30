import { Component, HostListener, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    public isCollapsedSidenav: boolean = true
    public showTooltipUser: boolean = false
    public showBreadcrumbMessages: boolean = false


    ngOnInit() {
        this.isCollapsedSidenav = document.querySelector('.is-collapsed') ? true : false
    }


    @HostListener('click', ['$event']) onWindowClick = ($event: any): void => {
        var sidenav = document.getElementById('sidenav')
        var toggleSidenav = document.getElementById('toggle-sidenav')
        var user_button = document.getElementById('user-button')
        var button_notification = document.getElementById('button-notification')
        var breadcrumb_messages = document.getElementById('breadcrumb-messages')

        if (sidenav?.contains($event.target) && !toggleSidenav?.contains($event.target)) {
            sidenav?.classList.remove('is-collapsed')
            this.isCollapsedSidenav = false
        } else if (!sidenav?.contains($event.target)) {
            sidenav?.classList.add('is-collapsed')
            this.isCollapsedSidenav = true
        }


        if (this.isCollapsedSidenav && toggleSidenav?.contains($event.target)) {
            sidenav?.classList.remove('is-collapsed')
            this.isCollapsedSidenav = false
        } else if (!this.isCollapsedSidenav && toggleSidenav?.contains($event.target)) {
            sidenav?.classList.add('is-collapsed')
            this.isCollapsedSidenav = true
        }


        if (user_button?.contains($event.target)) {
            this.showTooltipUser = true
        } else {
            this.showTooltipUser = false
        }

        if (button_notification?.contains($event.target) || breadcrumb_messages?.contains($event.target)) {
            this.showBreadcrumbMessages = true
        } else {
            this.showBreadcrumbMessages = false
        }
    }
}
