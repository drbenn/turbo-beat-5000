import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PercussionObject } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// https://www.youtube.com/watch?v=uasGsHf7UYA&t=371s

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
export class AppComponent implements OnInit {
  title = 'turbo-beat-5000';
  frequency = 440
  isMouseDownOnSlider: boolean = false;
  WAVEFORMS: OscillatorType[] = ['sine', 'square', 'sawtooth', 'triangle']
  waveformSelected: OscillatorType = 'sine';
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

 ngOnInit():void {

 }

  play() {
    const actx = new (AudioContext);
    if (!actx) throw 'Not supported :(';
    const osc = actx.createOscillator();
    // osc.type = 'sawtooth'; //  sine | square | sawtooth | triangle
    osc.type = this.waveformSelected;
    osc.frequency.value = this.frequency; // Hz = middle A
    osc.connect(actx.destination); // soundcard output
    osc.start();
    osc.stop(actx.currentTime + 2); //2 seconds of play
  }


  sliderChange(event:any) {
    this.frequency = event.target?.value;
    this.play();
  }

  clickDown() {
  this.isMouseDownOnSlider = true;
  console.log('Mouse Down? ' + this.isMouseDownOnSlider);

  }

  clickUp() {
    this.isMouseDownOnSlider = false;
    console.log('Mouse Down? ' + this.isMouseDownOnSlider);
    }


    playOnClickHold() {
      while (this.isMouseDownOnSlider) {
        this.play()
      }
    }



    onWaveformChange(event:any) {
      console.log(event.target.value);
      this.waveformSelected = this.WAVEFORMS[event.target.value]
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
      osc.stop(actx.currentTime + 1); //2 seconds of play
      return osc;

    }

    playOscillators(event:any) {

      this.frequency = event.target?.value;
      this.oscBank[0] = this.createOscillator(this.frequency, 0);
      this.oscBank[1] = this.createOscillator(this.frequency, -this.unisonWidth);
      this.oscBank[2] = this.createOscillator(this.frequency, this.unisonWidth);
    }

}
