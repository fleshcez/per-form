import { Directive, Input, SimpleChanges } from "@angular/core";
import {
    PerFormService,
    DataChangeType,
} from "../per-form-service/per-form-service";
import { PerFormControlSignal } from "./per-form-control-signal";
import { IPerFormControlOptions } from "./per-form-control.interace";

export const PerFormControlSignalFactory = {
    provide: PerFormControlSignal,
    useFactory: (perFormService: PerFormService<DataChangeType>) => {
        const control = new PerFormControlSignal(perFormService);
        return control;
    },
    deps: [[PerFormService<DataChangeType>]],
};

@Directive({
    selector: "[perFormControlSignal]",
    standalone: false,
    providers: [PerFormControlSignalFactory],
})
export class PerFormControlSignalProvider {
    @Input("perFormControlSignal.options") options!: IPerFormControlOptions;

    constructor(private _perFormControlSignal: PerFormControlSignal) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["options"]?.currentValue) {
            const optionsChange: IPerFormControlOptions =
                changes["options"].currentValue;
            this._perFormControlSignal.setup(optionsChange);
        }
    }
}
