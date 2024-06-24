import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companiesCache: any[] | null = null;
  private readonly apiUrl = 'https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies';

  constructor(private http: HttpClient) {}

  getCompanies(status?: boolean, name?: string): Observable<any[]> {
    if (this.companiesCache) {
      return of(this.filterCompanies(this.companiesCache, status, name));
    } else {
      return this.http.get<any[]>(this.apiUrl).pipe(
        tap(companies => this.companiesCache = companies),
        map(companies => this.filterCompanies(companies, status, name))
      );
    }
  }

  createCompany(company: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, company).pipe(
      tap(() => this.companiesCache = null),
      switchMap(() => this.getCompanies())
    );
  }

  deleteCompany(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.companiesCache = null),
      switchMap(() => this.getCompanies())
    );
  }

  updateCompany(id: string, company: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, company).pipe(
      tap(() => this.companiesCache = null),
      switchMap(() => this.getCompanies())
    );
  }

  private filterCompanies(companies: any[], status?: boolean, name?: string): any[] {
    return companies.filter(company => {
      const matchesStatus = status !== undefined ? company?.isActive === status : true;
      const matchesName = name ? company?.companyName?.toLowerCase().includes(name.toLowerCase()) : true;
      return matchesStatus && matchesName;
    });
  }
}
