import { Directive, Input } from "@angular/core";
import {
    PerFormService,
    DataChangeType,
} from "../per-form-service/per-form-service";
import { PerFormControlSignal } from "./per-form-control-signal";

export const PerFormControlSignalFactory = {
    provide: PerFormControlSignal,
    useFactory: (perFormService: PerFormService<DataChangeType>) => {
        return new PerFormControlSignal(perFormService);
    },
    deps: [[PerFormService<DataChangeType>]],
};

@Directive({
    selector: "[perFormControlSignal]",
    standalone: false,
    providers: [PerFormControlSignalFactory],
})
export class PerFormControlSignalProvider {
    @Input("perFormControlSignal.options") opts: any;
}
