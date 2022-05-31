import { Component, OnInit } from '@angular/core';
import { Labs } from 'src/app/protected/interfaces/labs';
import { LabService } from 'src/app/protected/services/labs.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  labs: Labs[] = [];
  lab!: Labs;
  loading: boolean = true;

  constructor(private _labService: LabService) {
    // this.lab = { id: 0, namLab:" ", location:"", capacity:"", amount:"",description:""};
  }

  ngOnInit(): void {
    this._labService.getLabs().subscribe((labs) => {
      this.labs = labs;
      this.loading = false;
    });
  }
}
