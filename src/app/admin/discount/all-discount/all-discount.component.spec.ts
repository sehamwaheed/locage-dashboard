import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDiscountComponent } from './all-discount.component';

describe('AllDiscountComponent', () => {
  let component: AllDiscountComponent;
  let fixture: ComponentFixture<AllDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
