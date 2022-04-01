import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import {MatCardModule} from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    exports: [
        MatAutocompleteModule,
        MatCardModule,
        ToastrModule
    ]
})
export class MaterialDesignModule { }
