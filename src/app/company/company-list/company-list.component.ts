import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListComponent implements OnInit {
  public companies$!: Observable<Company[]>;

  constructor(private companyService: CompanyService) {
    this.companyService = companyService;
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companies$ = this.companyService.getCompanies();
  }

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id).subscribe(() => {
      this.getCompanies();
      alert(`Company ${id} deleted!`);
    });
  }
}
