import { Parameters } from '@bobliu0518/dockview-core';
export interface PanelParameters<T extends {} = Parameters> {
    params: T;
}
