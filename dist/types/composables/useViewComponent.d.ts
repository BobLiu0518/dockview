import { type ComponentInternalInstance } from 'vue';
import { type DockviewEvent } from '@bobliu0518/dockview-core';
export interface ViewComponentConfig<TApi, TOptions, TProps, TEvents, TView, TFrameworkOptions> {
    componentName: string;
    propertyKeys: readonly (keyof TOptions)[];
    createApi: (element: HTMLElement, options: TOptions & TFrameworkOptions) => TApi;
    createView: (id: string, name: string | undefined, component: any, instance: ComponentInternalInstance) => TView;
    extractCoreOptions: (props: TProps) => TOptions;
}
export declare function useViewComponent<TApi extends {
    dispose(): void;
    updateOptions(options: Partial<TOptions>): void;
    layout(width: number, height: number): void;
    onDidSashChange: DockviewEvent<void>;
}, TOptions, TProps, TEvents, TView, TFrameworkOptions>(config: ViewComponentConfig<TApi, TOptions, TProps, TEvents, TView, TFrameworkOptions>, props: TProps, emit: (event: any, ...args: any[]) => void): {
    el: import("vue").Ref<HTMLElement>;
    instance: import("vue").Ref<import("vue").UnwrapRef<TApi>>;
};
