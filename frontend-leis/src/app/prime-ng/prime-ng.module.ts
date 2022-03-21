import { NgModule } from '@angular/core';

import { MenubarModule } from 'primeng/menubar'
import { ButtonModule } from 'primeng/button'
import { MegaMenuModule } from 'primeng/megamenu'

@NgModule({
    exports: [
        MenubarModule,
        ButtonModule,
        MegaMenuModule
    ]
})
export class PrimeNgModule { }
