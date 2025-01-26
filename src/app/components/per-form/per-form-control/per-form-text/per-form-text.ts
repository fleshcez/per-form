import { Component, computed, Input, signal, Signal } from "@angular/core";
import { PerFormControlSignal } from "../per-form-control-signal";
import { IPerFormControlOptions } from "../per-form-control.interace";

@Component({
    selector: "per-form-text",
    templateUrl: "./per-form-text.html",
    styleUrls: ["./per-form-text.scss"],
    standalone: false,
})
export class PerFormText {
    @Input()
    public label: string | undefined;
    @Input()
    public options!: IPerFormControlOptions;
    public inputValue: Signal<string> = signal("");
    public constructor(public control: PerFormControlSignal) {}

    ngOnChanges() {
        if (!this.control || !this.options) {
            return;
        }

        this.control.setup(this.options);

        this.inputValue = computed(() => {
            const val = this.control!.value();
            if (val === undefined) {
                return "";
            } else {
                return val as string;
            }
        });
    }

    public onChange(event: Event): void {
        if (this.control) {
            this.control.setValue((event.target as HTMLInputElement).value);
        }
    }
}
