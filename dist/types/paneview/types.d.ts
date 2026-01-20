import type { PaneviewApi, PaneviewOptions, PaneviewPanelApi } from '@bobliu0518/dockview-core';
export interface PaneviewReadyEvent {
    api: PaneviewApi;
}
export interface IPaneviewVuePanelProps<T extends Record<string, any> = any> {
    params: T;
    api: PaneviewPanelApi;
    containerApi: PaneviewApi;
    title: string;
}
export interface IPaneviewVueProps extends PaneviewOptions {
    components: Record<string, string>;
}
export type PaneviewVueEvents = {
    ready: [event: PaneviewReadyEvent];
    didSashChange: [];
};
