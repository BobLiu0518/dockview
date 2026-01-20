import type { IGridviewVueProps } from './types';
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToOption<IGridviewVueProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    ready: (event: import("./types").GridviewReadyEvent) => void;
    didSashChange: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<IGridviewVueProps>>> & {
    onReady?: (event: import("./types").GridviewReadyEvent) => any;
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
