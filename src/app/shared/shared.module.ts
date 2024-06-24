import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeCompanyComponent } from './components/modals/change-company/change-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalContainerComponent } from '../modal-container.component';

@NgModule({
  declarations: [
    ChangeCompanyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ChangeCompanyComponent
  ]
})
export class SharedModule { }
