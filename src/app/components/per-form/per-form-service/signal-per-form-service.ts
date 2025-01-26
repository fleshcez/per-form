import { Signal, signal, WritableSignal } from "@angular/core";
import { DataChangeType, PerFormService } from "./per-form-service";

export class SignalPerFormService implements PerFormService<DataChangeType> {
    public _data: WritableSignal<Record<string, unknown> | undefined> =
        signal(undefined);
    public data: Signal<Record<string, unknown> | undefined> = this._data;
    public dataChanged(data: Record<string, unknown>): void {
        this._data.set(data);
    }
}

export class SignalPerFormService2 implements PerFormService<DataChangeType> {
    public x = 123;
    public _data: WritableSignal<Record<string, unknown> | undefined> =
        signal(undefined);
    public data: Signal<Record<string, unknown> | undefined> = this._data;
    public dataChanged(data: Record<string, unknown>): void {
        this._data.set(data);
    }
}
