import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { BadgeModule } from 'primeng/badge';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
@NgModule({
    exports: [
        BreadcrumbModule,
        BadgeModule,
        FileUploadModule,
        HttpClientModule,
        ToastrModule,
        TableModule,
        DropdownModule,
        MultiSelectModule
    ]
})
export class PrimeNgModule { }
