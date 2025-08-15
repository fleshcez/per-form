import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerFormComponent } from "./per-form.component";
import { PerFormText } from "./per-form-control/per-form-text/per-form-text";
import { PerFormCheckbox } from "./per-form-control/per-form-checkbox/per-form-checkbox.component";
import { Test } from "./per-form-control/test.component/test.component";
import { PerFormControlSignalProvider } from "./per-form-control/per-form-signal-provider.directive";
import { PerFormRow } from "./per-form-row/per-form-row";

@NgModule({
    declarations: [
        PerFormComponent,
        PerFormText,
        PerFormCheckbox,
        Test,
        PerFormControlSignalProvider,
        PerFormRow,
    ],
    imports: [CommonModule],
    exports: [
        PerFormComponent,
        PerFormText,
        PerFormCheckbox,
        PerFormRow,
        PerFormControlSignalProvider,
    ],
})
export class PerFormModule {}
