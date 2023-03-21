export class UpdateSynthSetting {
  static readonly type = '[SYNTH] update synth setting';
  constructor(public setting: any) {}
}


export class UpdatePercussionTrack {
  static readonly type = '[PERCUSSION] update percussion track';
  constructor(public beat: any) {}
}
