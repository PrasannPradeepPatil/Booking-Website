import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightListingFilterComponent } from './flight-listing-filter.component';

describe('FlightListingFilterComponent', () => {
  let component: FlightListingFilterComponent;
  let fixture: ComponentFixture<FlightListingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightListingFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
