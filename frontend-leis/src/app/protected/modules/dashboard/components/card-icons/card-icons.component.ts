import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-card-icons',
    templateUrl: './card-icons.component.html',
    styleUrls: ['./card-icons.component.css']
})
export class CardIconsComponent {

    @Input() public icon!: string
    @Input() public label!: string
    @Input() public route!: string
    @Input() public color!: string

}
