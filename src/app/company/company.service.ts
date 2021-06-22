import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from './company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }

  loadCompanies() {
    this.httpClient
      .get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap((x) => console.info('[SERVICE] tap', x)),
        catchError((error) => this.errorHandler<Company[]>(error)),
        finalize(() => console.info('[SERVICE] final'))
      )
      .subscribe((c) => {
        this.companies$.next(c);
      });
  }

  getCompany(id: number): Observable<Company> {
    return this.httpClient
      .get<Company>(`${this.API_BASE}/company/${id}`)
      .pipe(catchError((error) => this.errorHandler<Company>(error)));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient
      .post<Company>(`${this.API_BASE}/company`, company, {
        headers: new HttpHeaders().set('content-type', 'application/json'),
      })
      .pipe(catchError((e) => this.errorHandler<Company>(e)));
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient
      .put<Company>(`${this.API_BASE}/company/${company?.id}`, company, {})
      .pipe(catchError((e) => this.errorHandler<Company>(e)));
  }

  deleteCompany(id: number): Observable<Company> {
    return this.httpClient
      .delete<Company>(`${this.API_BASE}/company/${id}`)
      .pipe(catchError((e) => this.errorHandler<Company>(e)));
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.error('[SERVICE] error', error);
    return new Observable<T>();
  }
}
