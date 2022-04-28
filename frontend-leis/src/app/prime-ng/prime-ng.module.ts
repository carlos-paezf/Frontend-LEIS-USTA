import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { BadgeModule } from 'primeng/badge';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {EditorModule} from 'primeng/editor';
import {TreeSelectModule} from 'primeng/treeselect';
import {ButtonModule} from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    exports: [
        BreadcrumbModule,
        BadgeModule,
        FileUploadModule,
        HttpClientModule,
        ToastrModule,
        TableModule,
        DropdownModule,
        MultiSelectModule,
        EditorModule,
        TreeSelectModule,
        ButtonModule,
        ToolbarModule
    ]
})

export class PrimeNgModule { }
