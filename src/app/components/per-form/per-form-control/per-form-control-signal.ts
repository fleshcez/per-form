import { FormControl } from "@angular/forms";
import { SignalPerFormService } from "../per-form-service/signal-per-form-service";
import {
    computed,
    inject,
    Injectable,
    Injector,
    runInInjectionContext,
    signal,
    Signal,
} from "@angular/core";
import { set, get } from "lodash";
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
    private _injector = inject(Injector);
    public formControl: FormControl;

    constructor(
        // private _options: IPerFormControlOptions,
        // private _data: Record<string, unknown>,
        perFormService: PerFormService<DataChangeType>,
    ) {
        super();
        this.formControl = new FormControl();
        if (perFormService instanceof SignalPerFormService === false) {
            throw new Error(
                "Expected PerFormService to be of type SignalPerFormService",
            );
        }
        this._signalPerFormService = perFormService as SignalPerFormService;
        // this._setup();
    }

    public setup(options: IPerFormControlOptions) {
        this._options = options;
        runInInjectionContext(this._injector, () => {
            if (
                options.accessMode !== undefined &&
                options.accessMode.mode === AccessMode.disabled
            ) {
                this.isDisabled = computed(() => {
                    const data = this._signalPerFormService.data();
                    return this.evaluteAccessExpression(data!, options);
                });
            }

            if (
                options.accessMode !== undefined &&
                options.accessMode.mode === AccessMode.readonly
            ) {
                this.isReadonly = computed(() => {
                    const data = this._signalPerFormService.data();
                    return this.evaluteAccessExpression(data!, options);
                });
            }

            if (options.show !== undefined) {
                this.show = computed(() => {
                    const data = this._signalPerFormService.data();
                    return this.evaluteShowExpression(data!, options);
                });
            }

            this.value = computed(() => {
                const data = this._signalPerFormService.data();
                if (data) {
                    return get(data, options.valueBinding);
                }
                return undefined;
            });
        });
    }

    public override setValue(value: any) {
        const data = this._signalPerFormService.data();
        super.setValue(
            value,
            this.formControl,
            data!,
            this._options,
            this._signalPerFormService,
        );
    }
}

// export class PerFormControlSignal extends PerFormControlBase {
//     public show: Signal<boolean> = signal(true);
//     public isDisabled: Signal<boolean> = signal(false);
//     public isReadonly: Signal<boolean> = signal(false);

//     public value: Signal<unknown> = signal(undefined);

//     constructor(
//         public formControl: FormControl,
//         private _options: IPerFormControlOptions,
//         private _data: Record<string, unknown>,
//         private _perFormService: PerFormService<DataChangeType>,
//     ) {
//         super();
//         this._setup();
//     }

//     private _setup() {
//         const signalPerFormService = this
//             ._perFormService as SignalPerFormService;

//         if (
//             this._options.accessMode !== undefined &&
//             this._options.accessMode.mode === AccessMode.disabled
//         ) {
//             this.isDisabled = computed(() => {
//                 const data = signalPerFormService.data();
//                 return this.evaluteAccessExpression(data!, this._options);
//             });
//         }

//         if (
//             this._options.accessMode !== undefined &&
//             this._options.accessMode.mode === AccessMode.readonly
//         ) {
//             this.isReadonly = computed(() => {
//                 const data = signalPerFormService.data();
//                 return this.evaluteAccessExpression(data!, this._options);
//             });
//         }

//         if (this._options.show !== undefined) {
//             this.show = computed(() => {
//                 const data = signalPerFormService.data();
//                 return this.evaluteShowExpression(data!, this._options);
//             });
//         }

//         this.value = computed(() => {
//             const data = signalPerFormService.data();
//             if (data) {
//                 return get(data, this._options.valueBinding);
//             }
//             return undefined;
//         });
//     }

//     public override setValue(value: any) {
//         super.setValue(
//             value,
//             this.formControl,
//             this._data,
//             this._options,
//             this._perFormService,
//         );
//     }
// }
