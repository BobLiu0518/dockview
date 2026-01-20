import { IPanePart, PanePanelComponentInitParameter, PanelUpdateEvent } from '@bobliu0518/dockview-core';
import { type ComponentInternalInstance } from 'vue';
import { type VueComponent } from '../utils';
import type { IPaneviewVuePanelProps } from './types';
export declare class VuePaneviewPanelView implements IPanePart {
    readonly id: string;
    private readonly vueComponent;
    private readonly parent;
    private readonly _element;
    private part?;
    get element(): HTMLElement;
    constructor(id: string, vueComponent: VueComponent<IPaneviewVuePanelProps>, parent: ComponentInternalInstance);
    init(parameters: PanePanelComponentInitParameter): void;
    toJSON(): {
        id: string;
    };
    update(params: PanelUpdateEvent): void;
    dispose(): void;
}
