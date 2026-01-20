import { SplitviewPanel, IFrameworkPart } from '@bobliu0518/dockview-core';
import { type ComponentInternalInstance } from 'vue';
import { type VueComponent } from '../utils';
import type { ISplitviewVuePanelProps } from './types';
export declare class VueSplitviewPanelView extends SplitviewPanel {
    private readonly vueComponent;
    private readonly parent;
    constructor(id: string, component: string, vueComponent: VueComponent<ISplitviewVuePanelProps>, parent: ComponentInternalInstance);
    getComponent(): IFrameworkPart;
}
