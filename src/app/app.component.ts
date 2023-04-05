import { Component, OnInit } from '@angular/core';
import { style, transition, trigger, animate } from '@angular/animations';
import { Store } from '@ngxs/store';
import { UpdateVisualSetting } from './shared/state/appState.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('400ms ease-out',
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('400ms ease-in',
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})


export class AppComponent implements OnInit {
  settingsOpen: boolean = false;
  isBackdropOn: boolean = true;
  isParticlesOn: boolean = true;

  constructor(private store: Store) { }

  ngOnInit():void {}

  protected toggleViewSettings() {
    this.settingsOpen = !this.settingsOpen
 }

  protected updateViewSettings(setting: string) {
    if (setting === "backdrop") {
      this.isBackdropOn = !this.isBackdropOn
    }
    if (setting === "particles") {
      this.isParticlesOn = !this.isParticlesOn
    }
    let visualSettings = {
      backdrop: this.isBackdropOn,
      particles: this.isParticlesOn,
    }
    this.store.dispatch(new UpdateVisualSetting(visualSettings))
  }
}
