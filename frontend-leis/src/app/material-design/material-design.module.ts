import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import {MatCardModule} from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    exports: [
        MatAutocompleteModule,
        MatCardModule,
        ToastrModule,
        MatProgressBarModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class MaterialDesignModule { }
