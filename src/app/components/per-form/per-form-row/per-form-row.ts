import { Component } from "@angular/core";
import {
    ParentFormControlToken,
    PerFormGroup,
} from "../per-form-group/per-form-group";

@Component({
    selector: "per-form-row",
    templateUrl: "./per-form-row.html",
    styleUrls: ["./per-form-row.scss"],
    providers: [
        {
            provide: ParentFormControlToken,
            useExisting: PerFormRow,
        },
    ],
    // imports: [PerFormGroup],
    standalone: false,
})
export class PerFormRow extends PerFormGroup {}
