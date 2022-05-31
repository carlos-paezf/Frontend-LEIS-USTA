import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  MinLengthValidator,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css'],
})
export class AdministrarComponent implements OnInit {
  AdministrarForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.AdministrarForm = this.initForm();
  }
  onSubmit(): void {
    console.log('Form ->', this.AdministrarForm.value);

    console.log(this.AdministrarForm.get('nomLab')?.value);
  }

  initForm(): FormGroup {
    return this.fb.group({
      nomLab: ['', [Validators.required, Validators.minLength(4)]],
      ubicacion: [['', Validators.required]],
      aforo: [['', Validators.required]],
      capEqui: ['', [Validators.required]],
      desc: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
    });
  }
}
