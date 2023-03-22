import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayAnimationComponent } from './play-animation.component';

describe('PlayAnimationComponent', () => {
  let component: PlayAnimationComponent;
  let fixture: ComponentFixture<PlayAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
