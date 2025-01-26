import { FormControl } from "@angular/forms";
import { set, get } from "lodash";
import {
    DataChangeType,
    PerFormService,
} from "../per-form-service/per-form-service";
import { map, Observable, of } from "rxjs";
import { ObservablePerFormService } from "../per-form-service/observable-per-form-service";
import {
    AccessMode,
    IPerFormControlOptions,
} from "./per-form-control.interace";
import { PerFormControlBase } from "./per-form-common";

export class PerFormControlObs extends PerFormControlBase {
    public show$: Observable<boolean> = of(true);
    public isDisabled$: Observable<boolean> = of(false);
    public isReadonly$: Observable<boolean> = of(false);
    public value$: Observable<unknown> = of(undefined);

    constructor(
        public formControl: FormControl,
        private _options: IPerFormControlOptions,
        private _data: Record<string, unknown>,
        private _perFormService: PerFormService<DataChangeType>,
    ) {
        super();
        this._setup();
    }

    private _setup() {
        const observablePerFormService = this
            ._perFormService as ObservablePerFormService;
        if (
            this._options.accessMode !== undefined &&
            this._options.accessMode.mode === AccessMode.disabled
        ) {
            this.isDisabled$ = observablePerFormService.data.pipe(
                map(data => {
                    return this.evaluteAccessExpression(data!, this._options);
                }),
            );
        }

        if (
            this._options.accessMode !== undefined &&
            this._options.accessMode.mode === AccessMode.readonly
        ) {
            this.isReadonly$ = observablePerFormService.data.pipe(
                map(data => {
                    return this._options.accessMode!.expression.bind(
                        data,
                    )() as boolean;
                }),
            );
        }

        if (this._options.show !== undefined) {
            this.show$ = observablePerFormService.data.pipe(
                map(data => {
                    return this.evaluteAccessExpression(data!, this._options);
                }),
            );
        }

        this.value$ = observablePerFormService.data.pipe(
            map(data => {
                if (data) {
                    return get(data, this._options.valueBinding);
                }
                return undefined;
            }),
        );
    }

    public override setValue(value: any) {
        super.setValue(
            value,
            this.formControl,
            this._data,
            this._options,
            this._perFormService,
        );
    }
}
