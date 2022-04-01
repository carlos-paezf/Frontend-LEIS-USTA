import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'app-mini-card-statistics',
    templateUrl: './mini-card-statistics.component.html',
    styleUrls: ['./mini-card-statistics.component.css']
})
export class MiniCardStatisticsComponent {

    @Input() value!: string
    @Input() label!: string
}
