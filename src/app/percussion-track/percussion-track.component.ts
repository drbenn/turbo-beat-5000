import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PercussionObject } from '../shared/models';
import { PercussionPlaying, UpdatePercussionTrack } from '../shared/state/appState.actions';
import { log } from 'console';

@Component({
  selector: 'app-percussion-track',
  templateUrl: './percussion-track.component.html',
  styleUrls: ['./percussion-track.component.scss']
})
export class PercussionTrackComponent implements OnInit {

  // https://sonoport.github.io/web-audio-clock.html
  percussionTrack$: Observable<any> = this.store.select((state) => state.appState.percussionTrack);
  percussionTrack: any = {kick: [], snare: [], highHat: []};
  kickAudioPath: string = "./assets/audio/linn-kick.mp3";
  snareAudioPath: string = "./assets/audio/linn-snare.mp3";
  hatAudioPath: string = "./assets/audio/linn-hat.mp3";
  kick: any;
  snare: any;
  hat: any;
  // beatIndex: number = 0;
  isLooping: boolean = false;

  kickAudioCtx = new (AudioContext);
  snareAudioCtx = new (AudioContext);
  hatAudioCtx = new (AudioContext);
  kickSource: any;
  snareSource: any;
  hatSource: any;

  timeAudioContext = new AudioContext();
  timeOsc: any;
  setIntervalTime:number;

  ///////////////////////////////////////////////
  audioContext = null;
  unlocked: boolean = false;
  isPlaying = false;      // Are we currently playing?
  startTime;              // The start time of the entire sequence.
  current16thNote;        // What note is currently last scheduled?
  tempo = 120.0;          // tempo (in beats per minute)
  lookahead = 25.0;       // How frequently to call scheduling function
                              //(in milliseconds)
  scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
                              // This is calculated from lookahead, and overlaps
                              // with next interval (in case the timer is late)
  nextNoteTime = 0.0;     // when the next note is due.
  noteResolution = 0;     // 0 == 16th, 1 == 8th, 2 == quarter note
  noteLength = 0.05;      // length of "beep" (in seconds)
  canvas                 // the canvas element
  canvasContext;          // canvasContext is the canvas' context 2D
  last16thNoteDrawn = -1; // the last "box" we drew on the screen
  notesInQueue = [];      // the notes that have been put into the web audio,
                              // and may or may not have played yet. {note, time}
  timerWorker = null;     // The Web Worker used to fire timer messages

  constructor(private store:Store) {}


  ngOnInit(): void {
    this.percussionTrack$.subscribe((track: any) => {
      this.percussionTrack = track;
    })
    this.timeOsc = this.timeAudioContext.createOscillator();
  }

  toggleBeat(i:number, name:string) {
    // console.log(i, name);

    let newBeat = this.percussionTrack;
    // console.log(this.percussionTrack);
    if (name === 'kick') {
      newBeat.kick[i] = !newBeat.kick[i]
    }
    if (name === 'snare') {
      newBeat.snare[i] = !newBeat.snare[i]
    }
    if (name === 'highHat') {
      newBeat.highHat[i] = !newBeat.highHat[i]
    }
    this.store.dispatch(new UpdatePercussionTrack(newBeat))
  }



  getInstrument(instrument: string[]) {
    if (instrument.includes('kick')) {
      this.getKickData();
      this.kickSource.start(0)
    }
    if (instrument.includes('snare')) {
      this.getSnareData();
      this.snareSource.start(0)
    }
    if (instrument.includes('hat')) {
      this.getHatData();
      this.hatSource.start(0)
    }
  }

  getKickData() {
    this.kickSource = new AudioBufferSourceNode(this.kickAudioCtx);
    // this.kickSource = this.kickAudioCtx.createBufferSource();
    const kickRequest = new XMLHttpRequest();
    kickRequest.open("GET", this.kickAudioPath, true);
    kickRequest.responseType = "arraybuffer";

    kickRequest.onload = () => {
      const audioData = kickRequest.response;
      this.kickAudioCtx.decodeAudioData( audioData, (buffer) => {
          this.kickSource.buffer = buffer;
          this.kickSource.connect(this.kickAudioCtx.destination);
          this.kickSource.loop = false;
        },
        (err) => console.error(`Error with decoding audio data: ${err}`)
      );
    };
    kickRequest.send();
  }

  getSnareData() {
    this.snareSource = new AudioBufferSourceNode(this.snareAudioCtx);
    // this.snareSource = this.snareAudioCtx.createBufferSource();
    const snareRequest = new XMLHttpRequest();
    snareRequest.open("GET", this.snareAudioPath, true);
    snareRequest.responseType = "arraybuffer";
    snareRequest.onload = () => {
      const audioData = snareRequest.response;
      this.snareAudioCtx.decodeAudioData( audioData, (buffer) => {
          this.snareSource.buffer = buffer;
          this.snareSource.connect(this.snareAudioCtx.destination);
          this.snareSource.loop = false;
        },
        (err) => console.error(`Error with decoding audio data: ${err}`)
      );
    };
    snareRequest.send();
  }

  getHatData() {
    this.hatSource = new AudioBufferSourceNode(this.hatAudioCtx);
    // this.hatSource = this.hatAudioCtx.createBufferSource();
    const hatRequest = new XMLHttpRequest();
    hatRequest.open("GET", this.hatAudioPath, true);
    hatRequest.responseType = "arraybuffer";
    hatRequest.onload = () => {
      const audioData = hatRequest.response;
      this.hatAudioCtx.decodeAudioData( audioData, (buffer) => {
          this.hatSource.buffer = buffer;
          this.hatSource.connect(this.hatAudioCtx.destination);
          this.hatSource.loop = false;
        },
        (err) => console.error(`Error with decoding audio data: ${err}`)
      );
    };
    hatRequest.send();
  }

  isStarted: boolean = false;
  startTimeOsc() {
    this.store.dispatch(new PercussionPlaying(true))
    if (!this.isStarted) {
    this.timeOsc.start(this.timeAudioContext.currentTime);
    }
    this.isStarted = true;
    this.isPlaying = true;

    if (this.isPlaying) {
      this.setIntervalTime = window.setInterval(() => this.scheduler(), 50); // time called at ongoing interal, thus this.count +=1 to accumulate change of time
    }

  }

  stop() {
    this.store.dispatch(new PercussionPlaying(false))
    this.setIntervalTime = 0;
    this.isPlaying = false;
    // reset beatIndex to 0 so that when restarts plays first note & makes animiation over bars uniform/always from start
  }

nextNoteTimeII = this.timeAudioContext.currentTime + 0.5
currentTime = this.timeAudioContext.currentTime
beatIndex = 0;

  scheduler() {
    if (this.isPlaying) {
      let bpm = 444;
      let bps = 60/bpm;
      // const quarterNotesInObject:number  = 16;
      // const quarterNotesPerSecond = bpm/60


      if (this.nextNoteTime < this.timeAudioContext.currentTime + 0.5 && this.isPlaying) {
          let percussionOnNote: string[] = []

          if (this.percussionTrack.kick[this.beatIndex] === true) {percussionOnNote.push('kick')}
          if (this.percussionTrack.snare[this.beatIndex] === true) {percussionOnNote.push('snare')}
          if (this.percussionTrack.highHat[this.beatIndex] === true) {percussionOnNote.push('hat')}
          this.nextNoteTime += bps;
          this.getInstrument(percussionOnNote);
                this.beatIndex += 1;
      }
      if (this.beatIndex === 15) {
        this.beatIndex = -1;
      }
    }
  }
}

