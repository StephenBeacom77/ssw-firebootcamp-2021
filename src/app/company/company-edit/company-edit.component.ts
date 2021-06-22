import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
})
export class CompanyEditComponent implements OnInit {
  companyId!: number;
  isNewCompany!: boolean;
  companyForm!: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params.id;
    this.isNewCompany = !this.companyId;
    this.buildForm();

    if (!this.isNewCompany) {
      this.getCompany();
    }
  }

  buildForm(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: [''],
      email: [''],
    });
  }

  getCompany() {
    this.companyService
      .getCompany(this.companyId!)
      .subscribe((c) => this.companyForm.patchValue(c));
  }

  saveCompany(): void {
    const { value, valid } = this.companyForm;
    if (!valid) {
      return;
    }

    if (this.isNewCompany) {
      this.companyService
        .addCompany(value)
        .subscribe(() => this.router.navigate(['/company/list']));
    } else {
      const company = {
        id: this.companyId,
        ...value
      } as Company;
      this.companyService
        .updateCompany(company)
        .subscribe(() => this.router.navigate(['/company/list']));
    }
  }

  get f() {
    return this.companyForm.controls;
  }
}
