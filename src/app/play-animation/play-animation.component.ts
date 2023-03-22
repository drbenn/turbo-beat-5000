import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-play-animation',
  templateUrl: './play-animation.component.html',
  styleUrls: ['./play-animation.component.scss']
})
export class PlayAnimationComponent implements OnInit {
  @Select(state => state.appState.percussionPlaying) beatPlaying$:Observable<boolean>;
  isBeat: boolean;
  constructor() { }

  ngOnInit(): void {
    this.beatPlaying$.subscribe((beat) => {
      this.isBeat = beat;
      console.log(this.isBeat);

    })
  }

}
