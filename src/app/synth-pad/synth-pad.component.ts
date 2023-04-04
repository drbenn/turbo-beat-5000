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
  // waveform$: Observable<string> = this.store.select((state) => state.appState.waveform)
  @ViewChild('synthDiv', { static: true }) synthElement?: ElementRef;
  @HostListener('window:resize') onResize() {
    this.getSynthPadBounds();
  }

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
    ADSR = { attack: 1, decay: 1, sustain: 1, release: 0}
    STAGE_MAX_TIME = 10;

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

    // this.frequency = event.target?.value;
    let pitchLimits: number[] = [ 16.35, 1567.98]; // c0 up to g6
    this.frequency = pitchLimits[0] + ((pitchLimits[1] - pitchLimits[0]) * this.pitchFactor)
    // console.log(this.frequency);

    this.oscBank[0] = this.createOscillator(this.frequency, 0);
    this.oscBank[1] = this.createOscillator(this.frequency, -this.unisonWidth);
    this.oscBank[2] = this.createOscillator(this.frequency, this.unisonWidth);

  }

  createOscillator(freq: number, detune: number) {

    const actx = new (AudioContext);
    if (!actx) throw 'Not supported :(';

    //------------gainNode--------------
    const gainNode = actx.createGain()
    gainNode.gain.cancelScheduledValues(0);

    const osc = actx.createOscillator();

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


    // osc.connect(gainNode)

    // ATTACK -> DECAY -> SUSTAIN
    const now = actx.currentTime;
    const attackDuration = this.ADSR.attack + this.STAGE_MAX_TIME;
    const attackEndTime = now + attackDuration;
    const decayDuration = this.ADSR.decay * this.STAGE_MAX_TIME;

    gainNode.gain.setValueAtTime(0, actx.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, attackEndTime);
    gainNode.gain.setTargetAtTime(this.ADSR.sustain, attackEndTime, decayDuration);

    // osc.type = 'sawtooth'; //  sine | square | sawtooth | triangle
    osc.type = this.waveformSelected;
    osc.frequency.value = this.frequency; // Hz = middle A
    osc.detune.value = detune
    osc.connect(actx.destination); // soundcard output
    osc.start();
    osc.stop(actx.currentTime + 0.1); //2 seconds of play
    return osc;

  }

  activateSynth() {
    this.isSynthPlaying = true;
  }

  deactivateSynth() {
    this.isSynthPlaying = false;
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
    console.log(event);

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
