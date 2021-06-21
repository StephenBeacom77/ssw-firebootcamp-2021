import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
        tap(x => console.log('[SERVICE] tap', x)),
        catchError(error => this.errorHandler(error))
        )
      ;
  }

  private errorHandler(error: Error): Observable<Company[]> {
    console.error('Company Service Error', error);
    return new Observable<Company[]>();
  }
}
