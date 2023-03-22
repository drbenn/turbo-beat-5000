import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-synth-pad',
  templateUrl: './synth-pad.component.html',
  styleUrls: ['./synth-pad.component.scss']
})
export class SynthPadComponent implements OnInit {
  @Select(state => state.appState.selectedWaveform) waveform$:Observable<string>;
  // waveform$: Observable<string> = this.store.select((state) => state.appState.waveform)
  waveformSelected: OscillatorType;

  frequency = 440
  oscBank = new Array(3);
  unisonWidth:number = 5;

    // ADSR values between 0 & 1
    ADSR = { attack: 1, decay: 0, sustain: 0, release: 0}
    STAGE_MAX_TIME = 10;

    echo = {
      time: 0.2,
      feedback: 0.2,
      maxDuration: 2,
    }

    isDelay: boolean = true;
    isEcho: boolean = true;

  constructor(private store: Store) { }

  ngOnInit(): void {
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

  playOscillators(event:any) {

    this.frequency = event.target?.value;
    this.oscBank[0] = this.createOscillator(this.frequency, 0);
    this.oscBank[1] = this.createOscillator(this.frequency, -this.unisonWidth);
    this.oscBank[2] = this.createOscillator(this.frequency, this.unisonWidth);
  }

  createOscillator(freq: number, detune: number) {

    const actx = new (AudioContext);
    if (!actx) throw 'Not supported :(';

    //------------gainNode--------------
    const gainNode = actx.createGain()
    gainNode.gain.cancelScheduledValues(20);

    const osc = actx.createOscillator();

    if (this.isDelay) {
      osc.connect(actx.destination);
      const delayNode = actx.createDelay();
      delayNode.delayTime.value = this.echo.time * this.echo.maxDuration;
      delayNode.connect(actx.destination)

      // for repeating echos
      const echoGainNode = actx.createGain();
      echoGainNode.gain.value = this.echo.feedback;

      osc.connect(echoGainNode);
      delayNode.connect(echoGainNode)
      echoGainNode.connect(delayNode)
    }


    osc.connect(gainNode)

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
    osc.stop(actx.currentTime + 0.2); //2 seconds of play
    return osc;

  }

}
