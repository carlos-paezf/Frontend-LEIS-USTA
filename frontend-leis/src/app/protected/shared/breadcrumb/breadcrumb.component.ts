import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';
import { MsgGeneric } from '../../interfaces';
import { MessagesService } from '../../services';


@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {

    @Input() public showNotification!: boolean
    static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb'
    public readonly dashboard = { icon: 'pi pi-home', url: '/dashboard' }
    public menuItems!: MenuItem[]
    public badgeNotification: number = 0
    public messages!: MsgGeneric[]



    constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _msgService: MessagesService) {
        this._router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.menuItems = this.createBreadcrumbs(this._activatedRoute.root));

        this._msgService.getMessages()
            .subscribe(msgs => {
                this.messages = this.sortMsgs(msgs)
                this.messages.forEach(msg => !msg.check && (this.badgeNotification += 1))
            })
    }


    /**
     * Creates a breadcrumb array from the current route and its children
     * @param {ActivatedRoute} route - ActivatedRoute
     * @param {string} [url] - The url of the current route.
     * @param {MenuItem[]} breadcrumbs - MenuItem[] = []
     * @returns The breadcrumbs array.
     */
    public createBreadcrumbs = (route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] => {
        const children: ActivatedRoute[] = route.children

        if (children.length === 0) return breadcrumbs

        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/')
            if (routeURL !== '') {
                url += `/${routeURL}`
            }

            const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB]
            if (label) {
                breadcrumbs.push({ label, url })
            }

            return this.createBreadcrumbs(child, url, breadcrumbs)
        }

        return breadcrumbs
    }


    /**
     * It toggles the showNotification property of the class.
     */
    public togglePanelNotification = (): void => {
        this.showNotification = !this.showNotification
    }


    /**
     * It sorts the messages by date.
     * @param {MsgGeneric[]} msgs - The messages to sort.
     * @returns An array of messages sorted by date.
     */
    public sortMsgs = (msgs: MsgGeneric[]) => {
        return msgs.sort((a, b) => {
            if (a.date < b.date) return 1
            if (a.date > b.date) return -1
            return 0
        })
    }
}