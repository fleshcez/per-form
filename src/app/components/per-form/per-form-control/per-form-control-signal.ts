import { FormControl } from "@angular/forms";
import { SignalPerFormService } from "../per-form-service/signal-per-form-service";
import {
    computed,
    Injectable,
    signal,
    Signal,
    Inject,
    Optional,
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
import {
    ParentFormControlToken,
    IParentFormControl,
} from "../per-form-group/per-form-group";

@Injectable()
export class PerFormControlSignal extends PerFormControlBase {
    public show: Signal<boolean> = signal(true);
    public isDisabled: Signal<boolean> = signal(false);
    public isReadonly: Signal<boolean> = signal(false);

    public value: Signal<unknown> = signal(undefined);
    private _signalPerFormService!: SignalPerFormService;
    private _options!: IPerFormControlOptions;
    public formControl: FormControl;

    constructor(
        perFormService: PerFormService<DataChangeType>,
        @Inject(ParentFormControlToken)
        @Optional()
        private _parentFormControl: IParentFormControl,
    ) {
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

        // try to inherit accessMode from parent
        if (!options.accessMode) {
            this._inheritAccessMode();
        }

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
        this._parentFormControl?.registerChild(this);
    }

    private _inheritAccessMode(): void {
        if (!this._parentFormControl?.control) {
            return;
        }
        this.isDisabled = this._parentFormControl.control.isDisabled;
        this.isReadonly = this._parentFormControl.control.isReadonly;
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

    public getOptions(): IPerFormControlOptions {
        return { ...this._options };
    }

    public ngOnDestroy(): void {
        this._parentFormControl?.unregisterChild(this._options.id);
    }
}
