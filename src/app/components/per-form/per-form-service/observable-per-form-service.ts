import { BehaviorSubject, Observable } from "rxjs";
import { DataChangeType, PerFormService } from "./per-form-service";

export class ObservablePerFormService
    implements PerFormService<DataChangeType>
{
    public _data$: BehaviorSubject<Record<string, unknown> | undefined> =
        new BehaviorSubject<Record<string, unknown> | undefined>(undefined);
    public data: Observable<Record<string, unknown> | undefined> =
        this._data$.asObservable();

    public dataChanged(data: Record<string, unknown>): void {
        this._data$.next(data);
    }
}
