import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Company } from './company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {

  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) {
  }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap(x => console.info('[SERVICE] tap', x)),
        catchError(error => this.errorHandler<Company[]>(error)),
        finalize(() => console.info('[SERVICE] final'))
      );
  }

  deleteCompany(id: number) : Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${id}`)
      .pipe(
        catchError(error => this.errorHandler<Company>(error))
      );
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.error('[SERVICE] error', error);
    return new Observable<T>();
  }
}
