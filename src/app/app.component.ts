import { Component, Signal } from "@angular/core";
import { PerFormModule } from "./components/per-form/per-form.module";
import { SignalPerFormService } from "./components/per-form/per-form-service/signal-per-form-service";
import {
    DataChangeEventType,
    DataChangeType,
    PerFormService,
} from "./components/per-form/per-form-service/per-form-service";
import { PerFormControlBase } from "./components/per-form/per-form-control/per-form-common";
import { PerFormControlSignal } from "./components/per-form/per-form-control/per-form-control-signal";
import {
    AccessMode,
    IDependencyBasedUpdateStrategy,
    IPerFormControlOptions,
    UpdateStrategyType,
} from "./components/per-form/per-form-control/per-form-control.interace";

@Component({
    selector: "app-root",
    imports: [PerFormModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    providers: [
        {
            provide: PerFormService<DataChangeType>,
            useClass: SignalPerFormService,
        },
        // {
        //     provide: PerFormControlSignal,
        // useFactory: (perFormService: PerFormService<DataChangeType>) => {
        //     return new PerFormControlSignal(perFormService);
        // },
        // deps: [PerFormService],
        // },
    ],
})
export class AppComponent {
    title = "per-form";
    public data = {
        email: "john.doe@mail.com",
        showName: true,
        client: {
            name: "John Doe",
        },
    };

    public checkboxControlOptions: IPerFormControlOptions = {
        id: "showName",
        valueBinding: "showName",
    };

    public textControlOptions: IPerFormControlOptions = {
        id: "client.name",
        valueBinding: "client.name",
        show: {
            isDynamic: true,
            expression: function (this: Record<string, unknown>) {
                return this["showName"];
            },
        },
        accessMode: {
            mode: AccessMode.readonly,
            // isDynamic: true,
            updateStrategy: {
                type: UpdateStrategyType.dynamic,
            },
            expression: function (this: Record<string, unknown>) {
                return this["isReadonly"];
            },
        },
    };

    public textDependentControlOptions: IPerFormControlOptions = {
        id: "client.dependentName",
        valueBinding: "client.dependentName",
        accessMode: {
            mode: AccessMode.readonly,
            updateStrategy: {
                type: UpdateStrategyType.dependencyBased,
                dependencies: ["client.name"],
            } as IDependencyBasedUpdateStrategy,
            expression: function (this: Record<string, unknown>) {
                return this["isReadonly2"];
            },
        },
    };

    public checkboxDisabledControlOptions: IPerFormControlOptions = {
        id: "isReadonly2",
        valueBinding: "isReadonly2",
    };
}
