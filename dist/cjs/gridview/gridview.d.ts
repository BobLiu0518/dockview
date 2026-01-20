import React from 'react';
import { GridviewPanelApi, GridviewApi, GridviewOptions } from '@bobliu0518/dockview-core';
import { PanelParameters } from '../types';
export interface GridviewReadyEvent {
    api: GridviewApi;
}
export interface IGridviewPanelProps<T extends {
    [index: string]: any;
} = any> extends PanelParameters<T> {
    api: GridviewPanelApi;
    containerApi: GridviewApi;
}
export interface IGridviewReactProps extends GridviewOptions {
    onReady: (event: GridviewReadyEvent) => void;
    components: Record<string, React.FunctionComponent<IGridviewPanelProps>>;
    onDidSashChange?: () => void;
}
export declare const GridviewReact: React.ForwardRefExoticComponent<IGridviewReactProps & React.RefAttributes<HTMLDivElement>>;
