import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercussionTrackComponent } from './percussion-track.component';

describe('PercussionTrackComponent', () => {
  let component: PercussionTrackComponent;
  let fixture: ComponentFixture<PercussionTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercussionTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercussionTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
