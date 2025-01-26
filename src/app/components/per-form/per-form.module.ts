import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerFormComponent } from "./per-form.component";
import { PerFormText } from "./per-form-control/per-form-text/per-form-text";
import { PerFormCheckbox } from "./per-form-control/per-form-checkbox/per-form-checkbox.component";
import { Test } from "./per-form-control/test.component/test.component";

@NgModule({
    declarations: [PerFormComponent, PerFormText, PerFormCheckbox, Test],
    imports: [CommonModule],
    exports: [PerFormComponent, PerFormText, PerFormCheckbox],
})
export class PerFormModule {}
