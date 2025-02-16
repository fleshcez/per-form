import { FormControl } from "@angular/forms";
import { SignalPerFormService } from "../per-form-service/signal-per-form-service";
import {
    computed,
    inject,
    Injectable,
    Injector,
    signal,
    Signal,
} from "@angular/core";
import { get } from "lodash";
import {
    DataChangeType,
    PerFormService,
} from "../per-form-service/per-form-service";
import { PerFormControlBase } from "./per-form-common";
import {
    AccessMode,
    IPerFormControlOptions,
} from "./per-form-control.interace";

@Injectable()
export class PerFormControlSignal extends PerFormControlBase {
    public show: Signal<boolean> = signal(true);
    public isDisabled: Signal<boolean> = signal(false);
    public isReadonly: Signal<boolean> = signal(false);

    public value: Signal<unknown> = signal(undefined);
    private _signalPerFormService!: SignalPerFormService;
    private _options!: IPerFormControlOptions;
    public formControl: FormControl;

    constructor(perFormService: PerFormService<DataChangeType>) {
        super();
        this.formControl = new FormControl();
        if (perFormService instanceof SignalPerFormService === false) {
            throw new Error(
                "Expected PerFormService to be of type SignalPerFormService",
            );
        }
        this._signalPerFormService = perFormService as SignalPerFormService;
    }

    public setup(options: IPerFormControlOptions) {
        this._options = options;
        if (
            options.accessMode !== undefined &&
            options.accessMode.mode === AccessMode.disabled
        ) {
            this.isDisabled = computed(() => {
                const data = this._signalPerFormService.dataEvent();
                return this.evaluteAccessExpression(data!, options);
            });
        }

        if (
            options.accessMode !== undefined &&
            options.accessMode.mode === AccessMode.readonly
        ) {
            this.isReadonly = computed(() => {
                const data = this._signalPerFormService.dataEvent();
                return this.evaluteAccessExpression(data!, options);
            });
        }

        if (options.show !== undefined) {
            this.show = computed(() => {
                const data = this._signalPerFormService.dataEvent();
                return this.evaluteShowExpression(data!, options);
            });
        }

        this.value = computed(() => {
            const data = this._signalPerFormService.dataEvent()?.data;
            if (data) {
                return get(data, options.valueBinding);
            }
            return undefined;
        });
    }

    public override setValue(value: any) {
        const data = this._signalPerFormService.dataEvent()?.data;
        super.setValue(
            value,
            this.formControl,
            data!,
            this._options,
            this._signalPerFormService,
        );
    }
}
