import type { IDockviewVueProps } from './types';
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToOption<IDockviewVueProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    ready: (event: import("@bobliu0518/dockview-core").DockviewReadyEvent) => void;
    didSashChange: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<IDockviewVueProps>>> & {
    onReady?: (event: import("@bobliu0518/dockview-core").DockviewReadyEvent) => any;
    onDidSashChange?: () => any;
}, {}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
