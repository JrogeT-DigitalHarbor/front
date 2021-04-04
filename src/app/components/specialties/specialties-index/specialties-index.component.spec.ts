import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesIndexComponent } from './specialties-index.component';

describe('SpecialtiesIndexComponent', () => {
  let component: SpecialtiesIndexComponent;
  let fixture: ComponentFixture<SpecialtiesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialtiesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtiesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
