import { Component } from "@angular/core";
import {
    DataChangeType,
    PerFormService,
} from "../../per-form-service/per-form-service";
import { PerFormControlBase } from "../per-form-common";

@Component({
    selector: "test",
    templateUrl: "./test.component.html",
    standalone: false,
})
export class Test {
    constructor(
        public performService: PerFormService<DataChangeType>,
        control: PerFormControlBase,
    ) {}
}
