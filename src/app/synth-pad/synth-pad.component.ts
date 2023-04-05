import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SynthPadBounds } from '../shared/models';
import { log } from 'console';

@Component({
  selector: 'app-synth-pad',
  templateUrl: './synth-pad.component.html',
  styleUrls: ['./synth-pad.component.scss']
})

// https://www.youtube.com/watch?v=uasGsHf7UYA&t=371s
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
export class SynthPadComponent implements OnInit {
  @Select(state => state.appState.selectedWaveform) waveform$:Observable<string>;
  isKeyPress:boolean = false;
  // waveform$: Observable<string> = this.store.select((state) => state.appState.waveform)
  @ViewChild('synthDiv', { static: true }) synthElement?: ElementRef;
  @HostListener('window:resize') onResize() {
    this.getSynthPadBounds();
  }

  //https://pages.mtu.edu/~suits/notefreqs.html
  @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
      this.isKeyPress = true;
    const key: string = event.key;
    if (key === 'g') {
      this.frequency = 49.0;
      this.playOscillators();
    }
    if (key === 'a') {
      this.frequency = 55.0;
      this.playOscillators();
    }
    if (key === 'b') {
      this.frequency = 61.74;
      this.playOscillators();
    }
    if (key === 'c') {
      this.frequency = 66.41;
      this.playOscillators();
    }
    if (key === 'd') {
      this.frequency = 73.42;
      this.playOscillators();
    }
    if (key === 'e') {
      this.frequency = 82.41;
      this.playOscillators();
    }
    if (key === 'f') {
      this.frequency = 87.31;
      this.playOscillators();
    }
    if (key === 'h') {
      this.frequency = 98.00;
      this.playOscillators();
    }
    this.isKeyPress = false;
  }


  actx: any;
  gainNode: any;
  now: any;
  isCursorAnimated: boolean = false;
  top:any;
  left:any;
  isSynthPlaying: boolean = false;
  expand=false;
  hideCursor=false;
  animateCursor=false;
  @HostListener('document:mousedown', ['$event'])
  onClick($event) {
    this.isCursorAnimated = true;
    //  this.expand=true;
    this.hideCursor=true;
    this.animateCursor = true;
     setTimeout(() => {
      // this.expand=false;
      this.hideCursor=false;
      this.animateCursor = false;
     }, 500000)
 }

  @HostListener('document:mousemove', ['$event'])
  onMousemove($event) {
    this.getSynthPadBounds()
    this.top=($event.layerY ) + "px";
    this.left= ($event.layerX ) + "px";
 }

  // Volume & pitch factors are 0-1 values to assess and calculate bottom/top range of each using the synthpad
  volumeFactor:number;
  pitchFactor:number;
  synthBounds: SynthPadBounds;
  mouseX: number;
  mouseY: number;

  waveformSelected: OscillatorType;
  frequency = 440
  oscBank = new Array(3);
  unisonWidth:number = 10;

    // ADSR values between 0 & 1
    ADSR = { attack: 0.1, decay: 0.1, sustain: 0.1, release: .1}
    STAGE_MAX_TIME = 2; // seconds

    echo = {
      time: 0.2,
      feedback: 0.2,
      maxDuration: 2,
    }

    isDelay: boolean = false;
    isEcho: boolean = false;

  constructor(private store: Store ) { }


  ngOnInit(): void {
    this.getSynthPadBounds();
    this.waveform$.subscribe((wave) => {
      switch(wave) {
        case 'SIN':
          this.waveformSelected = 'sine'
          break;
        case 'SQR':
          this.waveformSelected = 'square'
          break;
        case 'SAW':
          this.waveformSelected = 'sawtooth'
          break;
        case 'TRI':
          this.waveformSelected = 'triangle'
          break;
        default:
          break;
      }
    })
  }

  // playOscillators(event) {
  playOscillators() {
    // console.log(event);
    this.actx = new (AudioContext);
    this.gainNode = this.actx.createGain()
    this.gainNode.gain.cancelScheduledValues(0.1);
    // this.frequency = event.target?.value;
    let pitchLimits: number[] = [ 16.35, 1567.98]; // c0 up to g6
    if (!this.isKeyPress) {
      this.frequency = pitchLimits[0] + ((pitchLimits[1] - pitchLimits    [0]) * this.pitchFactor)
    }

    // console.log(this.frequency);

    this.oscBank[0] = this.createOscillator(this.frequency, 0);
    this.oscBank[1] = this.createOscillator(this.frequency, -this.unisonWidth);
    this.oscBank[2] = this.createOscillator(this.frequency, this.unisonWidth);

  }

  createOscillator(freq: number, detune: number) {


    if (!this.actx) throw 'Not supported :(';

    //------------gainNode--------------


    const osc = this.actx.createOscillator();

    // if (this.isDelay) {
    //   osc.connect(actx.destination);
    //   const delayNode = actx.createDelay();
    //   delayNode.delayTime.value = this.echo.time * this.echo.maxDuration;
    //   delayNode.connect(actx.destination)

    //   // for repeating echos
    //   const echoGainNode = actx.createGain();
    //   echoGainNode.gain.value = this.echo.feedback;

    //   osc.connect(echoGainNode);
    //   delayNode.connect(echoGainNode)
    //   echoGainNode.connect(delayNode)
    // }


    osc.connect( this.gainNode)

    // ATTACK -> DECAY -> SUSTAIN
    this.now = this.actx.currentTime;
    const attackDuration = this.ADSR.attack + this.STAGE_MAX_TIME;
    const attackEndTime =  this.now + attackDuration;
    const decayDuration = this.ADSR.decay * this.STAGE_MAX_TIME;

    this.gainNode.gain.setValueAtTime(0, this.actx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(1, attackEndTime);
    this.gainNode.gain.setTargetAtTime(this.ADSR.sustain, attackEndTime, decayDuration);

    // osc.type = 'sawtooth'; //  sine | square | sawtooth | triangle
    osc.type = this.waveformSelected;
    osc.frequency.value = this.frequency; // Hz = middle A
    osc.detune.value = detune
    osc.connect(this.actx.destination); // soundcard output
    osc.start();
    osc.stop(this.actx.currentTime + 0.5); //2 seconds of play
    return osc;

  }

  activateSynth() {
    this.isSynthPlaying = true;
  }

  deactivateSynth() {
    this.isSynthPlaying = false;
    this.gainNode.gain.cancelScheduledValues(0.1);
    this.now = this.actx.currentTime(0);
    const relDuration = this.ADSR.release * this.STAGE_MAX_TIME;
    const relEndTime = this.now + relDuration;
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.now);
    // asdrNode.gain.linearRampToValueAtTime(0, relEndTime); // ???????????????????
  }

  getSynthPadBounds() {
    const bounds = this.synthElement.nativeElement.getBoundingClientRect();
    this.synthBounds = {
      top: bounds.top ,
      right: bounds.right,
      bottom: bounds.bottom,
      left: bounds.left,
      volumeRange: bounds.right - bounds.left,
      pitchRange: bounds.bottom - bounds.top,
    }
  }

  getMouseCoordinates(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.volumeFactor = (this.mouseX - this.synthBounds.left) / this.synthBounds.volumeRange
    this.pitchFactor = 1 - (this.mouseY - this.synthBounds.top) / this.synthBounds.pitchRange
    if (this.isSynthPlaying) {
      this.playOscillators();
    }
  }


  activateCursorAnimation() {
    // console.log('mouse cursor activate');
    this.isCursorAnimated = true;
  }

  deactivateCursorAnimation() {
    // console.log('mouse cursor deactivate');
    this.isCursorAnimated = false;
  }
}
