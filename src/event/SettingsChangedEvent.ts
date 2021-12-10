export default class SettingsChangedEvent extends Event {
    public static readonly eventName = 'setting-change-event';

    constructor(public text: string, public color: string, public url: string, public file: string | null) {
        super(SettingsChangedEvent.eventName);
    }
}
