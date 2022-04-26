import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})
export class CreateLoanComponent implements OnInit {
  prestamoForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.prestamoForm = this.fb.group({
       fecha_prestamo:['',Validators.required],
       estado_entrega:['',Validators.required],
       lugar_destino:['',Validators.required],
       cantidad:['',Validators.required],
       externo_interno:['',Validators.required],
       equipo:['',Validators.required],
       documento_solicitante:['',Validators.required],
    })
   }

  ngOnInit(): void {
  }
  agregarPrestamo(){

    console.log(this.prestamoForm)
  }

  

}
