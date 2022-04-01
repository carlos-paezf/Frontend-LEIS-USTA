import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/protected/services/loanUsers.service';
import { Loan } from 'src/app/protected/interfaces/loan-users';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  loans: Loan[] =[];
  statuses: any[] = [];

  constructor(private _loanService: LoanService) { }

  ngOnInit(): void {

    this._loanService.getLoan()
    .subscribe(loans => {
      this.loans = loans;
  })
  }
}
