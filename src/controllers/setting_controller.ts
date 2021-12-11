import {Controller} from "@hotwired/stimulus";
import SettingsChangedEvent from "../event/SettingsChangedEvent";

export default class extends Controller {
    private readonly textTarget: HTMLInputElement
    private readonly colorTarget: HTMLInputElement
    private readonly urlTarget: HTMLInputElement
    private readonly fileTarget: HTMLInputElement

    static targets = ['text', 'color', 'file', 'url']

    connect() {
        this.load()
    }

    load() {
        fetch('./setting.html')
            .then(response => response.text())
            .then(html => this.element.innerHTML = html)
    }

    change() {
        /* No files - direct dispatch */
        if (this.fileTarget.files.length === 0) {
            document.dispatchEvent(new SettingsChangedEvent(this.textTarget.value, this.colorTarget.value, this.urlTarget.value, null))
            return;
        }
        /* Has files - read content */
        const reader = new FileReader()
        reader.onload = (event) => {
            const fileContent = event.target.result as string;
            document.dispatchEvent(new SettingsChangedEvent(this.textTarget.value, this.colorTarget.value, this.urlTarget.value, fileContent))
        };
        reader.readAsDataURL(this.fileTarget.files[0]);
    }
}
