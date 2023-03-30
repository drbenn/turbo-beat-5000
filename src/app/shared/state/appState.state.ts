import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { PercussionPlaying, UpdatePercussionTrack, UpdateSynthSetting, UpdateWaveform } from "./appState.actions";

export interface AppStateModel {
    percussionPlaying: boolean;
    selectedWaveform: string,
    settings: any;
    percussionTrack: any;
  }

  @State<AppStateModel>({
    name: 'appState',
    defaults: {
      percussionPlaying: false,
      selectedWaveform: 'SQR',
      settings: {
        envelopeMeterGroup: {
            // attack, decay, sustain, release
            // attack: { dislayName: 'ATK', value: 0},
            // decay: { dislayName: 'DEC', value: 0},
            // sustain: { dislayName: 'SUS', value: 0},
            // release:{ dislayName: 'REL', value: 0},
            ATK: 50,
            DEC: 50,
            SUS: 50,
            REL: 50,
          },
          echoMeterGroup: {
            // time, feedback, max duration
            TIM: 50,
            FDB: 50,
            DUR: 50,
          }
      },
      percussionTrack: {
        kick: [ true, false, true, false, true, false, true, false, true, false, false, false, false, false, false, false ],
        snare: [ false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false ],
        highHat: [ false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false ]
      },
    },
  })
  @Injectable()
  export class AppState {
    constructor(
    //   private dataService: DataService,
    //   private http: HttpClient,
      private store: Store
    ) {}


    @Action(UpdateSynthSetting)
    updateSynthSetting(
      ctx: StateContext<AppStateModel>,
      payload: { setting: any }
    ) {
      const value:number = payload.setting.settingValue;
      const group = payload.setting.groupName
      const settingName: string = String(payload.setting.settingName);
      let newSettings = ctx.getState().settings;

      if (group === 'envelope') {
        newSettings.envelopeMeterGroup[settingName] = value;
      }

      if (group === 'echo') {
        newSettings.echoMeterGroup[settingName] = value;
      }
      ctx.patchState({ settings: newSettings });
    }

    @Action(PercussionPlaying)
    percussionPlaying(
      ctx: StateContext<AppStateModel>,
      payload: { isPlaying: boolean }
    ) {
      ctx.patchState({ percussionPlaying: payload.isPlaying });
    }

    @Action(UpdateWaveform)
    updateWaveform(
      ctx: StateContext<AppStateModel>,
      payload: { waveform: string }
    ) {
      ctx.patchState({ selectedWaveform: payload.waveform });
    }

    @Action(UpdatePercussionTrack)
    updatePercussionTrack(
      ctx: StateContext<AppStateModel>,
      payload: { newBeat: any }
    ) {
      console.log('in update perc');
      console.log(payload.newBeat);

      let newBeat;

      ctx.patchState({ percussionTrack: payload.newBeat});
    }


    }
