import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTimeEmployeesComponent } from './part-time-employees.component';

describe('PartTimeEmployeesComponent', () => {
  let component: PartTimeEmployeesComponent;
  let fixture: ComponentFixture<PartTimeEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartTimeEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartTimeEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
