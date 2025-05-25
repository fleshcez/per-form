import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Optional,
    SimpleChanges,
    SkipSelf,
} from "@angular/core";
import { SignalPerFormService } from "./per-form-service/signal-per-form-service";
import {
    DataChangeType,
    PerFormService,
} from "./per-form-service/per-form-service";
import { PerFormControlSignal } from "./per-form-control/per-form-control-signal";
export const PerFormControlSignalFactory = {
    provide: PerFormControlSignal,
    useFactory: (perFormService: PerFormService<DataChangeType>) => {
        return new PerFormControlSignal(perFormService);
    },
    deps: [[PerFormService<DataChangeType>]],
};
@Component({
    selector: "per-form",
    templateUrl: "./per-form.component.html",
    styleUrls: ["./per-form.component.scss"],
    providers: [
        {
            provide: PerFormService<DataChangeType>,
            useFactory: (parentService: PerFormService<DataChangeType>) =>
                parentService || new SignalPerFormService(),
            deps: [
                [
                    new Optional(),
                    new SkipSelf(),
                    PerFormService<DataChangeType>,
                ],
            ],
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class PerFormComponent {
    @Input()
    public data!: Record<string, unknown>;

    constructor(private perFormService: PerFormService<DataChangeType>) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes["data"].currentValue) {
            this.perFormService.updateData({ data: this.data });
        }
    }
}
