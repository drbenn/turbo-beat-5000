export class UpdateSettings {
  static readonly type = '[AUDIO-SETTINGS] update audio settings';
  constructor(public settings: any) {}
}
