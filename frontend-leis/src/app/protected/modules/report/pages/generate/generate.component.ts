import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styles: []
})
export class GenerateComponent implements OnInit {

  text: string;
  uploadedFiles: any[] = [];

    constructor() {
      this.text = '<div>Bienvenido!!</div><div>Escribe aqui!! <b>Reportes estudiantes</b> en mora..</div><div><br></div>';

  }
  ngOnInit(): void {}
  }
