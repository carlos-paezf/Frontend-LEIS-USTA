import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  text: string;
  uploadedFiles: any[] = [];

    constructor() {
      this.text = '<div>Escribe aqui!! <b>Reportes estudiantes</b> en mora..</div><div><br></div>';

  }
  ngOnInit(): void {}
  }
