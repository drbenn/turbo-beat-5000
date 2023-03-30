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
  meterSettings = {
    envelopeMeterGroup: {
        ATK: 50,
        DEC: 50,
        SUS: 50,
        REL: 50,
      },
      echoMeterGroup: {
        TIM: 50,
        FDB: 50,
        DUR: 50,
      }
  };

  constructor(
    private store:Store
  ) { }


  ngOnInit(): void {
    // Do not use - causes input ranges to stick at default state value
    // this.meterSettings$.subscribe((settings: any) => {
    //   console.log(settings);
    //   this.meterSettings = settings;
    // })
  }

  meterChange(e:any, name: any, group: string) {
    let value = 100 - e.target.value // flip counting due to slider orientation
    this.store.dispatch(new UpdateSynthSetting({settingName: name, settingValue: value, groupName: group}))
  }
}
