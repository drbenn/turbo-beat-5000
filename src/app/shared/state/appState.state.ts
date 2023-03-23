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
      selectedWaveform: 'SIN',
      settings: {
        envelopeMeterGroup: {
            // attack, decay, sustain, release
            // attack: { dislayName: 'ATK', value: 0},
            // decay: { dislayName: 'DEC', value: 0},
            // sustain: { dislayName: 'SUS', value: 0},
            // release:{ dislayName: 'REL', value: 0},
            ATK: 0,
            DEC: 0,
            SUS: 0,
            REL: 0,
          },
          echoMeterGroup: {
            // time, feedback, max duration
            TIM: 0,
            FDB: 0,
            DUR: 0,
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
      let state = ctx.getState();
      console.log('state');
      console.log(state);


      ctx.patchState({ settings: payload.setting });
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
