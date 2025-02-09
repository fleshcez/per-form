interface IShowPerformControl {
    expression: Function;
    // if set to true, it will be evaluated each time the data changes
    // is set to false, it will only be evaluated once with the initial data
    isDynamic?: boolean;
}

export enum AccessMode {
    readonly = "readonly",
    disabled = "disabled",
}

export interface IAccessModePerformControl {
    expression: Function;
    // if set to true, it will be evaluated each time the data changes
    // is set to false, it will only be evaluated once with the initial data
    isDynamic?: boolean;
    mode: AccessMode;
}

export interface IPerFormControlOptions {
    // can be the same as the binding, but must be unique
    id: string;
    // property on form model where value is stored and retrieved from
    valueBinding: string;
    show?: IShowPerformControl;
    accessMode?: IAccessModePerformControl;
}
