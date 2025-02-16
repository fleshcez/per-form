import { BehaviorSubject, Observable } from "rxjs";
import {
    DataChangeEventType,
    DataChangeType,
    PerFormService,
} from "./per-form-service";

export class ObservablePerFormService
    implements PerFormService<DataChangeType>
{
    public _data$: BehaviorSubject<DataChangeEventType | undefined> =
        new BehaviorSubject<DataChangeEventType | undefined>(undefined);
    public dataEvent: Observable<DataChangeEventType | undefined> =
        this._data$.asObservable();

    public updateData(data: DataChangeEventType): void {
        this._data$.next(data);
    }
}
