import { GridviewPanel, IFrameworkPart } from '@bobliu0518/dockview-core';
import { type ComponentInternalInstance } from 'vue';
import { type VueComponent } from '../utils';
import type { IGridviewVuePanelProps } from './types';
export declare class VueGridviewPanelView extends GridviewPanel {
    private readonly vueComponent;
    private readonly parent;
    constructor(id: string, component: string, vueComponent: VueComponent<IGridviewVuePanelProps>, parent: ComponentInternalInstance);
    getComponent(): IFrameworkPart;
}
