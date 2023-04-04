import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppState } from './shared/state/appState.state';
import { PercussionTrackComponent } from './percussion-track/percussion-track.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { ConsoleComponent } from './console/console.component';
import { SynthMetersComponent } from './synth-meters/synth-meters.component';
import { SynthPadComponent } from './synth-pad/synth-pad.component';
import { WaveformSelectComponent } from './waveform-select/waveform-select.component';
import { PlayAnimationComponent } from './play-animation/play-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    PercussionTrackComponent,
    BackdropComponent,
    ConsoleComponent,
    SynthMetersComponent,
    SynthPadComponent,
    WaveformSelectComponent,
    PlayAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AppState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
