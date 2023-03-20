import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { UpdateSynthSetting } from "./appState.actions";

export interface AppStateModel {
    percussionPlaying: boolean;
    settings: any;
  }

  @State<AppStateModel>({
    name: 'appState',
    defaults: {
      percussionPlaying: false,
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

    }
