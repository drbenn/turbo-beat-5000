export class UpdateSynthSetting {
  static readonly type = '[SYNTH] update synth setting';
  constructor(public setting: any) {}
}


export class UpdatePercussionTrack {
  static readonly type = '[PERCUSSION] update percussion track';
  constructor(public newBeat: any) {}
}

export class PercussionPlaying {
  static readonly type = '[PERCUSSION] play status';
  constructor(public isPlaying: boolean) {}
}

export class UpdateWaveform {
  static readonly type = '[SYNTH] update waveform';
  constructor(public waveform: string) {}
}

export class UpdateVisualSetting {
  static readonly type = '[BACKDROP] update visual setting';
  constructor(public setting: any) {}
}
