import {Controller} from "@hotwired/stimulus";
import SettingsChangedEvent from "../event/SettingsChangedEvent";

export default class extends Controller {
    private readonly containerTarget: HTMLDivElement
    private readonly linkTarget: HTMLAnchorElement
    private readonly imageTarget: HTMLImageElement

    static targets = ['container', 'link', 'image']

    connect() {
        this.load()
        document.addEventListener(SettingsChangedEvent.eventName, (event: SettingsChangedEvent) => this.preview(event));
    }

    load() {
        fetch('/preview.html')
            .then(response => response.text())
            .then(html => this.element.innerHTML = html)
    }

    preview(event: SettingsChangedEvent) {
        this.containerTarget.style.backgroundColor = event.color;
        this.linkTarget.innerHTML = event.text;
        this.linkTarget.href = event.url;
        if (event.file !== null) {
            this.imageTarget.src = event.file;
        }
    }
}
