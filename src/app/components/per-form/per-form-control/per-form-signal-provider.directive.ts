import {
    Directive,
    Input,
    SimpleChanges,
    Optional,
    SkipSelf,
} from "@angular/core";
import {
    PerFormService,
    DataChangeType,
} from "../per-form-service/per-form-service";
import { PerFormControlSignal } from "./per-form-control-signal";
import {
    IPerFormControlOptions,
    IPerFormControlOptionsBase,
} from "./per-form-control.interace";
import {
    IParentFormControl,
    ParentFormControlToken,
} from "../per-form-group/per-form-group";

export const PerFormControlSignalFactory = {
    provide: PerFormControlSignal,
    useFactory: (
        perFormService: PerFormService<DataChangeType>,
        parent: IParentFormControl,
    ) => {
        const control = new PerFormControlSignal(perFormService, parent);
        return control;
    },
    deps: [
        [PerFormService<DataChangeType>],
        [new Optional(), new SkipSelf(), ParentFormControlToken],
    ],
};

@Directive({
    selector: "[perFormControlSignal]",
    standalone: false,
    providers: [PerFormControlSignalFactory],
})
export class PerFormControlSignalProvider {
    @Input("perFormControlSignal.options") options!: IPerFormControlOptionsBase;

    constructor(private _perFormControlSignal: PerFormControlSignal) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["options"]?.currentValue) {
            const optionsChange: IPerFormControlOptions =
                changes["options"].currentValue;
            this._perFormControlSignal.setup(optionsChange);
        }
    }
}
