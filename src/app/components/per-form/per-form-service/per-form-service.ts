import { Signal } from "@angular/core";
import { Observable } from "rxjs";

export interface IDataChangeEmitter {
    id: string;
}

export type DataChangeEventType = {
    data: Record<string, unknown>;
    emitter?: IDataChangeEmitter;
};

export type DataChangeType =
    | Signal<DataChangeEventType | undefined>
    | Observable<DataChangeEventType | undefined>;

export abstract class PerFormService<T> {
    public abstract dataEvent: T;
    public abstract updateData(data: DataChangeEventType): void;
}
