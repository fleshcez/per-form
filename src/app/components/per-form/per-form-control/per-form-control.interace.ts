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

export type ComponentId = string;

export interface IAccessModePerformControl {
    expression: Function;
    // if set to true, it will be evaluated each time the data changes
    // is set to false, it will only be evaluated once with the initial data
    // isDynamic?: boolean;
    mode: AccessMode;
    updateStrategy?: IUpdateStrategy;
}

export enum UpdateStrategyType {
    // The component will update its computable properties each time the data changes
    dynamic = "dynamic",
    // The component will update its computable properties only once with the initial data
    static = "static",
    // The component will update its computable properties once with the initial data and then
    // only recompunte if the emitter of the data change event is in the list of component ids
    dependencyBased = "dependencyBased",
}

export interface IUpdateStrategy {
    type: UpdateStrategyType;
}

export interface IDynamicUpdateStrategy extends IUpdateStrategy {
    type: UpdateStrategyType.dynamic;
}

export interface IStaticUpdateStrategy extends IUpdateStrategy {
    type: UpdateStrategyType.static;
}

export interface IDependencyBasedUpdateStrategy extends IUpdateStrategy {
    type: UpdateStrategyType.dependencyBased;
    // If present, the component will check if the emitter of the data change event
    // is present in this list of ids and only then will it update it's computable properties
    dependencies: ComponentId[];
}

export interface IPerFormControlOptions {
    // can be the same as the binding, but must be unique
    id: string;
    // property on form model where value is stored and retrieved from
    valueBinding: string;
    show?: IShowPerformControl;
    accessMode?: IAccessModePerformControl;
    // If present, the component will check if the emitter of the data change event
    // is in the list of component ids and only then will it update it's computable
    // properties. Such as show and accessmode
    // componentDependencies?: ComponentId[];
}
