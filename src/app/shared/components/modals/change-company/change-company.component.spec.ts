import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCompanyComponent } from './change-company.component';

describe('ChangeCompanyComponent', () => {
  let component: ChangeCompanyComponent;
  let fixture: ComponentFixture<ChangeCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
