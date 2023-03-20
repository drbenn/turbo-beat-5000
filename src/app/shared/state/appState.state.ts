import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { UpdateSettings } from "./appState.actions";

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
            attack: { dislayName: 'ATK', value: 0},
            decay: { dislayName: 'DEC', value: 0},
            sustain: { dislayName: 'SUS', value: 0},
            release:{ dislayName: 'REL', value: 0},
          },
          echoMeterGroup: {
            time: { dislayName: 'TIM', value: 0},
            feedback: { dislayName: 'FBK', value: 0},
            maxDuration: { dislayName: 'DUR', value: 0},
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


    @Action(UpdateSettings)
    updateSettings(
      ctx: StateContext<AppStateModel>,
      payload: { settings: any }
    ) {
      ctx.patchState({ settings: payload.settings });
    }

    }
