// import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngxs/store';
// import { Observable } from 'rxjs';
// import { PercussionObject } from '../shared/models';
// import { PercussionPlaying } from '../shared/state/appState.actions';

// @Component({
//   selector: 'app-percussion-track',
//   templateUrl: './percussion-track.component.html',
//   styleUrls: ['./percussion-track.component.scss']
// })
// export class PercussionTrackComponent implements OnInit {
//   audio: any;
//   isLooping: boolean = false;
//   kickAudioPath: string = "./assets/audio/linn-kick.mp3";
//   snareAudioPath: string = "./assets/audio/linn-snare.mp3";
//   hatAudioPath: string = "./assets/audio/linn-hat.mp3";
//   soundImgName: string = "audio-3-off";

//   percussionTrack$: Observable<any> = this.store.select((state) => state.appState.percussionTrack);

//   percussionTrack: any = {kick: [], snare: [], highHat: []};

//   beatTime: number = 0;
//   beatTempo: number = 34; // 34 = staying alive
//   intervalId: number;
//   interval: any;

//   kick: any;
//   snare: any;
//   hat: any;

//   bpm: number = 480;
//   bps: number = this.bpm/60;
//   beatIndex: number = 0;


//   constructor(private store:Store) {


//   }
//   ngOnInit(): void {
//     this.percussionTrack$.subscribe((track: any) => {
//       console.log(track);
//       this.percussionTrack = track;
//     })

//     this.kick = new Audio();
//     this.kick.load();
//     this.kick.src = this.kickAudioPath;

//     this.snare = new Audio();
//     this.snare.load();
//     this.snare.src = this.snareAudioPath;

//     this.hat = new Audio();
//     this.hat.load();
//     this.hat.src = this.hatAudioPath;
//   }

//   toggleBeat(i:number, name:string) {
//     //   this.percussion[name][i] = !this.percussion[name][i]
//     // console.log(this.percussion);

//   }

//   startTime() {
//     // setInterval()
//     if (typeof window !== 'undefined'){
//       this.intervalId = window.setInterval(() => {
//         this.beatLoop()
//         console.log(this.beatTime);
//         //
//       }
//         ); // time called at ongoing interal, thus this.count +=1 to accumulate change of time
//     }
//   }

//   beatLoop() {
//     let beatQuarterNote = this.beatTempo / 4;
//     if (this.beatTime === 0 || this.beatTime % this.beatTempo === 0) {
//       // based on the json t/f play sound at interval & beat loop

//       // at time reference t/f value and pass to
//       this.playSound();
//     }
//     this.beatTime += 1; // 1 second = 100 beatTime


//   }

//   playSound() {
//     if (!this.audio) {
//       this.audio = new Audio();
//     }

//     this.audio.src = this.kickAudioPath;
//     // const strLen = this.soundImgName.length;
//     // const last3 = this.soundImgName.slice(strLen -3,strLen);

//     // switch audio on
//     // if (last3 === "off") {
//       // this.soundImgName = this.soundImgName.slice(0, strLen -3) + "on"
//       this.audio.load();
//       // this.audio.loop = true;
//       // this.audio.muted = false;
//       this.audio.play();
//     // }

//     // switch audio off
//     // if (last3 !== "off") {
//     //   this.soundImgName = this.soundImgName.slice(0, strLen -2) + "off";
//     //   this.audio.muted = true;
//     // }
//     // console.log(this.beatTime);

//   }

//   stopSound() {
//     this.audio.pause();
//   }


//   startLoop() {
//     this.store.dispatch(new PercussionPlaying(true));
//     this.isLooping = true;
//     // console.log('start loop');
//     // while (this.isLooping) {
//     //   this.intervalId = window.setInterval(() => {
//     //     // this.beatLoop()
//     //     console.log(this.beatTime);
//     //     //
//     //   }
//     //     );
//     // }
//     //while loop == true
//     // this.interval = setInterval(() => {
//     //   // if(this.timeLeft > 0) {
//     //   //   this.timeLeft--;
//     //   // } else {
//     //   //   this.timeLeft = 60;
//     //   // }
//     //   console.log(this.interval);

//     // },1000)
//     this.interval = setInterval(() => {

//       const intervalReset: number = 1600 / this.bps; // beats x 16 t/f options
//       const beatInterval: number = intervalReset / 16;
//         if (this.isLooping) {
//           if (this.interval >= intervalReset) {this.interval = 0}
//           // console.log(this.interval / this.bps);

//           // if (this.interval % beatInterval === 0) {
//             if (this.interval % 100 === 0) {
//             // console.log(this.interval);
//             this.beatIndex += 1;
//             // console.log(this.beatIndex);

//             this.playBeat(this.bpm, this.interval, this.percussionTrack);
//           }

//           this.addTime();
//           if (this.beatIndex === 15) {this.beatIndex = 0}

//         }
//       }
//     );

//   }

//   addTime() {
//     this.interval += 1 * this.bps;
//   }

//   stopLoop() {
//     this.store.dispatch(new PercussionPlaying(false));
//     this.isLooping = false;
//     console.log('stop loop');
//     console.log(this.interval);
//     this.interval = 0;
//     clearInterval(this.interval);
//   }

//   playBeat(beat:number, interval: any, track:any,) {
//     console.log('beat/note opportunity');
//     // const beatIndex:number = (interval/beat);
//     // console.log(beatIndex);
//     // console.log(track.kick);
//     // console.log(track.kick[beatIndex-1]);


//     if (track.kick[this.beatIndex-1]) {
//       this.playKick();
//     }
//     if (track.snare[this.beatIndex-1]) {
//       this.playSnare();
//     }
//     if (track.highHat[this.beatIndex-1]) {
//       this.playHat();
//     }



//   }

//   playKick() {
//     console.log('KICK');
//     this.kick.play();
//   }

//   playSnare() {
//     console.log('SNARE');
//     this.snare.play();
//   }

//   playHat() {
//     console.log('HAT');
//     this.hat.play();
//   }
// }
