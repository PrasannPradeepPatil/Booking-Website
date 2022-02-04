import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightDetailsFilterComponent } from './flight-details-filter.component';

describe('FlightDetailsFilterComponent', () => {
  let component: FlightDetailsFilterComponent;
  let fixture: ComponentFixture<FlightDetailsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightDetailsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDetailsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
