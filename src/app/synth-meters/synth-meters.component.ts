import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateSynthSetting } from '../shared/state/appState.actions';

@Component({
  selector: 'app-synth-meters',
  templateUrl: './synth-meters.component.html',
  styleUrls: ['./synth-meters.component.scss']
})
export class SynthMetersComponent implements OnInit {
  meterSettings$: Observable<boolean> = this.store.select((state) => state.appState.settings);
  meterSettings: any;

  constructor(
    private store:Store
  ) { }


  ngOnInit(): void {
    this.meterSettings$.subscribe((settings: any) => {
      console.log(settings);
      this.meterSettings = settings;
    })
  }

  meterChange(e:any, name: any) {
    let value = 100 - e.target.value // flip counting due to slider orientation
    console.log(value);
    console.log(name);
    this.store.dispatch(new UpdateSynthSetting({settingName: name, settingValue: value}))

  }
}
