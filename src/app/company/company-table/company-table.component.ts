import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {
  @Input() companies: Company[] | null = null;
  @Output() deleteCompanyClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  deleteCompany(company: Company) {
    this.deleteCompanyClicked.emit(company.id);
  }

  logChanges() {
    console.log('CHANGES !!!');
  }
}
