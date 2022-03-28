import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { BadgeModule } from 'primeng/badge';


@NgModule({
    exports: [
        BreadcrumbModule,
        BadgeModule,
    ]
})
export class PrimeNgModule { }
