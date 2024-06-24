import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService, ModalService } from '@elgomezz/finui';
import { Observable, map, tap } from 'rxjs';
import { CompanyService } from 'src/app/core/services/company/company.service';
import { ChangeCompanyComponent } from 'src/app/shared/components/modals/change-company/change-company.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'extcompanies';
  companies$: Observable<any[]> | undefined;
  currentPage = 1;
  pageSize = 6;
  collectionSize = 0;
  total = 0;
  searchName = '';
  searchStatus: boolean | undefined;

  constructor(private companyService: CompanyService,
    private modalService: ModalService,
    private confirmService: ConfirmService,
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const page = params['page'];
      this.currentPage = page ? +page : 1;
      this.refreshCompanies();
    });

    this.refreshCompanies();
      this.confirmService.confirmTrigger$.subscribe((id) => {
        this.deleteCompany(id)
      });
  }

  refreshCompanies() {
    this.companies$ = this.companyService.getCompanies(this.searchStatus, this.searchName).pipe(
      map(companies => {
        this.collectionSize = companies.length;
        this.total = Math.ceil(this.collectionSize / this.pageSize);
        return companies;
      })
    );
  }

  deleteCompany(id: string): void {
    this.companies$ = this.companyService.deleteCompany(id).pipe(
      tap(companies => {
        this.collectionSize = companies.length;
        this.total = Math.ceil(this.collectionSize / this.pageSize);
      })
    );
  }

  createCompany(): void {
    this.companies$ = this.companyService.createCompany({ companyName: "luiz reactive - teste2", "collaboratorsCount": 10000, "isActive": false }).pipe(
      tap(companies => {
        this.collectionSize = companies.length;
        this.total = Math.ceil(this.collectionSize / this.pageSize);
      })
    );
  }

  search() {
    this.refreshCompanies();
  }

  openExampleModal(id: string) {
    this.confirmService.open({ data: id });
  }

  openChangeModal(action: string, company?: any) {
    this.modalService.openModal(ChangeCompanyComponent, { action, company })
  }
}
