import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@elgomezz/finui';
import { Observable, tap } from 'rxjs';
import { CompanyService } from 'src/app/core/services/company/company.service';

@Component({
  selector: 'app-change-company',
  templateUrl: './change-company.component.html',
  styleUrls: ['./change-company.component.scss']
})
export class ChangeCompanyComponent {
  @Input() action: 'edit' | 'create' = 'create';
  @Input() company: any = { companyName: '', collaboratorsCount: 0, isActive: true };
  submit$!: Observable<any>;
  companyForm: FormGroup;

  constructor(private fb: FormBuilder, private companyService: CompanyService, private modalService: ModalService) {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      collaboratorsCount: [0, Validators.required],
      isActive: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.action === 'edit' && this.company) {
      this.companyForm.patchValue(this.company);
    }
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      if (this.action === 'edit') {
        this.submit$ = this.companyService.updateCompany(this.company.id, this.companyForm.value).pipe(
          tap(() => this.modalService.closeModal())
        );
      } else {
        this.submit$ = this.companyService.createCompany(this.companyForm.value).pipe(
          tap(() => this.modalService.closeModal())
        );
      }
    }
  }
}
