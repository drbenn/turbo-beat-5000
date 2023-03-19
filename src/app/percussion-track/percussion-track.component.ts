import { Component } from '@angular/core';
import { PercussionObject } from '../shared/models';

@Component({
  selector: 'app-percussion-track',
  templateUrl: './percussion-track.component.html',
  styleUrls: ['./percussion-track.component.scss']
})
export class PercussionTrackComponent {
  audio: any;
  kickAudioPath: string = "./assets/audio/Reverb LinnDrum Sample Pack_Kick Hard.wav";
  soundImgName: string = "audio-3-off";



  percussion: any = {
    kick: [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
    snare: [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
    highHat: [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ]
  }

  beatTime: number = 0;
  beatTempo: number = 34; // 34 = staying alive
  intervalId: number;

  toggleBeat(i:number, name:string) {
      this.percussion[name][i] = !this.percussion[name][i]
    console.log(this.percussion);

  }

  startTime() {
    // setInterval()
    if (typeof window !== 'undefined'){
      this.intervalId = window.setInterval(() => {
        this.beatLoop()
        console.log(this.beatTime);
        //
      }
        ); // time called at ongoing interal, thus this.count +=1 to accumulate change of time
    }
  }

  beatLoop() {
    let beatQuarterNote = this.beatTempo / 4;
    if (this.beatTime === 0 || this.beatTime % this.beatTempo === 0) {
      // based on the json t/f play sound at interval & beat loop

      // at time reference t/f value and pass to
      this.playSound();
    }
    this.beatTime += 1; // 1 second = 100 beatTime


  }

  playSound() {
    if (!this.audio) {
      this.audio = new Audio();
    }

    this.audio.src = this.kickAudioPath;
    // const strLen = this.soundImgName.length;
    // const last3 = this.soundImgName.slice(strLen -3,strLen);

    // switch audio on
    // if (last3 === "off") {
      // this.soundImgName = this.soundImgName.slice(0, strLen -3) + "on"
      this.audio.load();
      // this.audio.loop = true;
      // this.audio.muted = false;
      this.audio.play();
    // }

    // switch audio off
    // if (last3 !== "off") {
    //   this.soundImgName = this.soundImgName.slice(0, strLen -2) + "off";
    //   this.audio.muted = true;
    // }
    console.log(this.beatTime);

  }
}
