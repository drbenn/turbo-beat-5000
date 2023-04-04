import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UpdateWaveform } from '../shared/state/appState.actions';

@Component({
  selector: 'app-waveform-select',
  templateUrl: './waveform-select.component.html',
  styleUrls: ['./waveform-select.component.scss']
})
export class WaveformSelectComponent implements OnInit {
  waveforms: string[] = ['SAW', 'SIN', 'SQR', 'TRI']
  waveBtnClass: string[] = ['wave-button-active', 'wave-button', 'wave-button','wave-button']

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onSelectWave(wave: string) {
    this.waveBtnClass = this.waveforms.map((option) => {
      return option == wave ? 'wave-button-active' : 'wave-button';
    })
    this.store.dispatch(new UpdateWaveform(wave));
  }
}
