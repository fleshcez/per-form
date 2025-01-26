import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Optional,
    Signal,
    SkipSelf,
} from "@angular/core";
// import { PerFormService } from "./per-form-service/per-form-service";
import { FormControl } from "@angular/forms";
import { PerFormControlSignal } from "./per-form-control/per-form-control-signal";
import { SignalPerFormService } from "./per-form-service/signal-per-form-service";
import {
    DataChangeType,
    PerFormService,
} from "./per-form-service/per-form-service";
import { AccessMode } from "./per-form-control/per-form-control.interace";

@Component({
    selector: "per-form",
    templateUrl: "./per-form.component.html",
    styleUrls: ["./per-form.component.scss"],
    // providers: [
    //     {
    //         provide: PerFormService,
    //         useFactory: (parentService: PerFormService) =>
    //             parentService || new PerFormService(),
    //         deps: [[new Optional(), new SkipSelf(), PerFormService]],
    //     },
    // ],
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
    public data: Record<string, unknown> = { showName: true };
    // public textControl: PerFormControlSignal;
    // public checkboxControl: PerFormControlSignal;
    // public checkboxDisabledControl: PerFormControlSignal;

    constructor(private perFormService: PerFormService<DataChangeType>) {
        // this.textControl = new PerFormControlSignal(
        //     {
        //         valueBinding: "client.name",
        //         show: {
        //             isDynamic: true,
        //             expression: function (this: Record<string, unknown>) {
        //                 return this["showName"];
        //             },
        //         },
        //         accessMode: {
        //             mode: AccessMode.readonly,
        //             isDynamic: true,
        //             expression: function (this: Record<string, unknown>) {
        //                 return this["isReadonly"];
        //             },
        //         },
        //     },
        //     this.data,
        //     this.perFormService,
        // );
        // this.checkboxControl = new PerFormControlSignal(
        //     new FormControl(),
        //     {
        //         valueBinding: "showName",
        //     },
        //     this.data,
        //     this.perFormService,
        // );
        // this.checkboxDisabledControl = new PerFormControlSignal(
        //     new FormControl(),
        //     {
        //         valueBinding: "isReadonly",
        //     },
        //     this.data,
        //     this.perFormService,
        // );
        this.perFormService.dataChanged(this.data);
    }
}
