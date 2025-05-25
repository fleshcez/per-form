import { Component, Input } from "@angular/core";
import { PerFormControlSignal } from "../per-form-control-signal";
import { IPerFormControlOptions } from "../per-form-control.interace";
import {
    DataChangeType,
    PerFormService,
} from "../../per-form-service/per-form-service";
import { PerFormControlSignalFactory } from "../../per-form.component";

@Component({
    selector: "per-form-checkbox",
    templateUrl: "./per-form-checkbox.component.html",
    styleUrls: ["./per-form-checkbox.component.scss"],
    providers: [PerFormControlSignalFactory],
    standalone: false,
})
export class PerFormCheckbox {
    @Input()
    public label: string | undefined;
    @Input()
    public options!: IPerFormControlOptions;
    // @Input()
    // public control: PerFormControlSignal;

    // public constructor(perFormService: PerFormService<DataChangeType>) {
    //     this.control = new PerFormControlSignal(perFormService);
    // }
    constructor(
        // perFormService: PerFormService<Signal<DataChangeEventType | undefined>>,
        public control: PerFormControlSignal,
    ) {
        // this.control = new PerFormControlSignal(perFormService);
    }

    public ngOnChanges() {
        if (!this.control || !this.options) {
            return;
        }
        this.control.setup(this.options);
    }

    public onChange(event: Event): void {
        if (this.control) {
            this.control.setValue((event.target as HTMLInputElement).checked);
        }
    }
}
