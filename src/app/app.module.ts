import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PercussionTrackComponent } from './percussion-track/percussion-track.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { SliderMeterComponent } from './slider-meter/slider-meter.component';
import { ConsoleComponent } from './console/console.component';
import { MeterComponent } from './meter/meter.component';
import { MeterGroupingComponent } from './meter-grouping/meter-grouping.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppState } from './shared/state/appState.state';

@NgModule({
  declarations: [
    AppComponent,
    PercussionTrackComponent,
    BackdropComponent,
    SliderMeterComponent,
    ConsoleComponent,
    MeterComponent,
    MeterGroupingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
