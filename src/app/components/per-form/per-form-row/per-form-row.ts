import {
    Component,
    computed,
    InjectionToken,
    Input,
    Optional,
    Signal,
    signal,
} from "@angular/core";
import { PerFormControlSignal } from "../per-form-control/per-form-control-signal";
import { IPerformGroupOptions } from "../per-form-control/per-form-control.interace";

export interface IParentFormControl {
    registerChild(child: PerFormControlSignal): void;
    unregisterChild(childId: string): void;
    allChildrenReadonly: Signal<boolean>;
    allChildrenDisabled: Signal<boolean>;
    control: PerFormControlSignal;
}
export const ParentFormControlToken = new InjectionToken<IParentFormControl>(
    "ParentFormControlToken",
);

@Component({
    selector: "per-form-row",
    templateUrl: "./per-form-row.html",
    providers: [
        {
            provide: ParentFormControlToken,
            useExisting: PerFormRow,
        },
    ],
    standalone: false,
})
export class PerFormRow implements IParentFormControl {
    @Input() options!: IPerformGroupOptions;
    public children = new Map<string, PerFormControlSignal>();
    public allChildrenReadonly: Signal<boolean> = signal(false);
    public allChildrenDisabled: Signal<boolean> = signal(false);

    constructor(@Optional() public control: PerFormControlSignal) {}

    public registerChild(child: PerFormControlSignal): void {
        this.children.set(child.getOptions().id, child);
        console.log(child);
        this._updateReadonlySignal();
        this._updateDisabledSignal();
    }

    public unregisterChild(childId: string): void {
        this.children.delete(childId);
        this._updateReadonlySignal();
        this._updateDisabledSignal();
    }

    private _updateReadonlySignal(): void {
        this.allChildrenReadonly = computed(() =>
            Array.from(this.children.values()).every(child =>
                child.isReadonly(),
            ),
        );
    }

    private _updateDisabledSignal(): void {
        this.allChildrenDisabled = computed(() =>
            Array.from(this.children.values()).every(child =>
                child.isDisabled(),
            ),
        );
    }
}
