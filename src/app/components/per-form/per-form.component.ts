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
import {
    ParentFormControlToken,
    PerFormGroup,
} from "./per-form-group/per-form-group";
import { PerFormRow } from "./per-form-row/per-form-row";
import { PerFormControlSignal } from "./per-form-control/per-form-control-signal";

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
        {
            provide: ParentFormControlToken,
            useExisting: PerFormComponent,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class PerFormComponent extends PerFormGroup {
    @Input()
    public data!: Record<string, unknown>;

    constructor(
        private perFormService: PerFormService<DataChangeType>,
        public override control: PerFormControlSignal,
    ) {
        super(control);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["data"].currentValue) {
            this.perFormService.updateData({ data: this.data });
        }
    }
}
