import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsIndexComponent } from './hospitals-index.component';

describe('HospitalsIndexComponent', () => {
  let component: HospitalsIndexComponent;
  let fixture: ComponentFixture<HospitalsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
