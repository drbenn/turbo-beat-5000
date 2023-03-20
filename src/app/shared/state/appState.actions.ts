export class UpdateSynthSetting {
  static readonly type = '[SYNTH-SETTINGS] update synth setting';
  constructor(public setting: any) {}
}
