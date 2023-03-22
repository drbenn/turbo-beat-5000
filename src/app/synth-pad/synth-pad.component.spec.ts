import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthPadComponent } from './synth-pad.component';

describe('SynthPadComponent', () => {
  let component: SynthPadComponent;
  let fixture: ComponentFixture<SynthPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynthPadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SynthPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
