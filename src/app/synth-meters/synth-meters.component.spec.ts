import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthMetersComponent } from './synth-meters.component';

describe('SynthMetersComponent', () => {
  let component: SynthMetersComponent;
  let fixture: ComponentFixture<SynthMetersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynthMetersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SynthMetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
