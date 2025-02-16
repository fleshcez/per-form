import { Signal, signal, WritableSignal } from "@angular/core";
import {
    DataChangeEventType,
    DataChangeType,
    PerFormService,
} from "./per-form-service";

export class SignalPerFormService implements PerFormService<DataChangeType> {
    public _data: WritableSignal<DataChangeEventType | undefined> =
        signal(undefined);
    public dataEvent: Signal<DataChangeEventType | undefined> = this._data;
    public updateData(dataEvent: DataChangeEventType): void {
        this._data.set(dataEvent);
    }
}

export class SignalPerFormService2 implements PerFormService<DataChangeType> {
    public x = 123;
    public _data: WritableSignal<DataChangeEventType | undefined> =
        signal(undefined);
    public dataEvent: Signal<DataChangeEventType | undefined> = this._data;
    public updateData(data: DataChangeEventType): void {
        this._data.set(data);
    }
}
