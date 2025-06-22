import { Component, Input } from "@angular/core";
import { PerFormControlSignal } from "../per-form-control-signal";
import { IPerFormControlOptions } from "../per-form-control.interace";

@Component({
    selector: "per-form-checkbox",
    templateUrl: "./per-form-checkbox.component.html",
    styleUrls: ["./per-form-checkbox.component.scss"],
    standalone: false,
})
export class PerFormCheckbox {
    @Input()
    public label: string | undefined;
    @Input()
    public options!: IPerFormControlOptions;

    constructor(public control: PerFormControlSignal) {}

    public onChange(event: Event): void {
        if (this.control) {
            this.control.setValue((event.target as HTMLInputElement).checked);
        }
    }
}
