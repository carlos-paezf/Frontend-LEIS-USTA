Creamos un componente para el formulario de de crear prestamo:
```txt
ng g c protected/modules/loan/pages/create-loan --skip-tests
```
En este componente realizamos las validaciones con Reactive forms:

import { ReactiveFormsModule } from '@angular/forms';

    imports: [
        CommonModule,
        LoanRoutingModule,
        PrimeNgModule,
        ReactiveFormsModule
    ]

style  component

.titulo{
    font-size: 1.8rem;
}

.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited,
.btn-primary:focus {
    background-color: #011b47;
    border-color: #011b47;
}

.form-check-input, .form-check-label{
    margin-left: 10px;
}
.text-danger{
    text-align: start;
    margin-left: 7px;
}