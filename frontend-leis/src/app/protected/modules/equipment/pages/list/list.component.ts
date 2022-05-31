import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/protected/services/equipment.service';
import { Equipment } from 'src/app/protected/interfaces/list-equipment';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  /* This is a property that is assigned an array of Equipment objects. */
  equipments: Equipment[] = [];

  constructor(private _equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this._equipmentService.getEquipment().subscribe(equipments => {
      this.equipments = equipments;
    })
  }
}
