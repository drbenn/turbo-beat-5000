import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderMeterComponent } from './slider-meter.component';

describe('SliderMeterComponent', () => {
  let component: SliderMeterComponent;
  let fixture: ComponentFixture<SliderMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderMeterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
