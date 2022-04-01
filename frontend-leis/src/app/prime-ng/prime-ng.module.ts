import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {TreeSelectModule} from 'primeng/treeselect';
import {ButtonModule} from 'primeng/button';


@NgModule({
    exports: [
        BreadcrumbModule,
        BadgeModule,
        TableModule,
        MultiSelectModule,
        DropdownModule,
        EditorModule,
        TreeSelectModule,
        ButtonModule
    ]
})

export class PrimeNgModule { }
