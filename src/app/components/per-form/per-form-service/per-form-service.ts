import { Signal } from "@angular/core";
import { Observable } from "rxjs";

export type DataChangeType =
    | Signal<Record<string, unknown> | undefined>
    | Observable<Record<string, unknown> | undefined>;

export abstract class PerFormService<T> {
    public abstract data: T;
    public abstract dataChanged(data: Record<string, unknown>): void;
}
