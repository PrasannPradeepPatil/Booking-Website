import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelListingFilterComponent } from './hotel-listing-filter.component';

describe('HotelListingFilterComponent', () => {
  let component: HotelListingFilterComponent;
  let fixture: ComponentFixture<HotelListingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelListingFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
