import { FormControl } from "@angular/forms";
import { set } from "lodash";
import {
    DataChangeType,
    PerFormService,
} from "../per-form-service/per-form-service";
import { IPerFormControlOptions } from "./per-form-control.interace";

export class PerFormControlBase {
    protected cachedShow: boolean | undefined = undefined;
    protected cachedAccessMode: boolean | undefined = undefined;

    public evaluteShowExpression(
        data: Record<string, unknown>,
        options: IPerFormControlOptions,
    ) {
        if (!options.show?.isDynamic) {
            if (this.cachedShow === undefined) {
                this.cachedShow = options.show!.expression.bind(data)();
            }
            return this.cachedShow;
        }

        return options.show.expression.bind(data)();
    }

    public evaluteAccessExpression(
        data: Record<string, unknown>,
        options: IPerFormControlOptions,
    ) {
        if (!options.accessMode?.isDynamic) {
            if (this.cachedAccessMode === undefined) {
                this.cachedAccessMode =
                    options.accessMode!.expression.bind(data)();
            }
            return this.cachedAccessMode;
        }

        return options.accessMode.expression.bind(data)();
    }

    public setValue(
        value: any,
        formControl: FormControl,
        data: Record<string, unknown>,
        options: IPerFormControlOptions,
        perFormService: PerFormService<DataChangeType>,
    ) {
        formControl.setValue(value);
        set(data, options.valueBinding, value);
        perFormService.dataChanged({ ...data });
    }
}
