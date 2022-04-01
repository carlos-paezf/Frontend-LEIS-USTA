import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    exports: [
      MatAutocompleteModule,
      FormsModule,
      ReactiveFormsModule
    ]
})
export class MaterialDesignModule { }
