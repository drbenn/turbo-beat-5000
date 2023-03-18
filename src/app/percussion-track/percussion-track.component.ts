import { Component } from '@angular/core';
import { PercussionObject } from '../shared/models';

@Component({
  selector: 'app-percussion-track',
  templateUrl: './percussion-track.component.html',
  styleUrls: ['./percussion-track.component.scss']
})
export class PercussionTrackComponent {
  percussion: any = {
    kick: [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
    snare: [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
    highHat: [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
    subBass: [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ]
  }

  toggleBeat(i:number, name:string) {
      this.percussion[name][i] = !this.percussion[name][i]
    console.log(this.percussion);

  }
}
