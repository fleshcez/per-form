import { FormControl } from "@angular/forms";
import { set } from "lodash";
import {
    DataChangeEventType,
    DataChangeType,
    PerFormService,
} from "../per-form-service/per-form-service";
import {
    IDependencyBasedUpdateStrategy,
    IPerFormControlOptions,
    UpdateStrategyType,
} from "./per-form-control.interace";

export class PerFormControlBase {
    protected cachedShow: boolean | undefined = undefined;
    protected cachedAccessMode: boolean | undefined = undefined;

    public evaluteShowExpression(
        dataEvent: DataChangeEventType,
        options: IPerFormControlOptions,
    ) {
        const data = dataEvent.data;
        if (!options.show?.isDynamic) {
            if (this.cachedShow === undefined) {
                this.cachedShow = options.show!.expression.bind(data)();
            }
            return this.cachedShow;
        }

        return options.show.expression.bind(data)();
    }

    public evaluteAccessExpression(
        dataEvent: DataChangeEventType,
        options: IPerFormControlOptions,
    ) {
        const data = dataEvent.data;

        const strategy = options.accessMode?.updateStrategy?.type;
        switch (strategy) {
            case UpdateStrategyType.static: {
                if (this.cachedAccessMode === undefined) {
                    this.cachedAccessMode =
                        options.accessMode!.expression.bind(data)();
                }
                return this.cachedAccessMode;
            }
            case UpdateStrategyType.dependencyBased: {
                const restult = this._evaluteDependencyBasedAccessExpression(
                    dataEvent,
                    options,
                );
                return this.cachedAccessMode;
            }
            case UpdateStrategyType.dynamic:
            default: {
                return options.accessMode!.expression.bind(data)();
            }
        }
    }

    // Evaluate accessmode only when one of the components of interest changes data
    private _evaluteDependencyBasedAccessExpression(
        dataEvent: DataChangeEventType,
        options: IPerFormControlOptions,
    ) {
        const emitterId = dataEvent.emitter?.id;
        if (!emitterId) {
            return this.cachedAccessMode;
        }

        const strategy = options.accessMode
            ?.updateStrategy as IDependencyBasedUpdateStrategy;
        if (strategy.dependencies.includes(emitterId)) {
            this.cachedAccessMode = options.accessMode!.expression.bind(
                dataEvent.data,
            )();
        }
        return this.cachedAccessMode;
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
        perFormService.updateData({
            data: { ...data },
            emitter: { id: options.id },
        });
    }
}
