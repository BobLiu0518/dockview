(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("@bobliu0518/dockview-core"), require("vue")) : typeof define === "function" && define.amd ? define(["exports", "@bobliu0518/dockview-core", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["@bobliu0518/dockview-vue"] = {}, global.DockviewCore, global.Vue));
})(this, function(exports2, dockviewCore, vue) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  function findComponent(parent, name) {
    var _a, _b;
    let instance = parent;
    let component = null;
    while (!component && instance) {
      component = (_a = instance.components) == null ? void 0 : _a[name];
      instance = instance.parent;
    }
    if (!component) {
      component = (_b = parent.appContext.components) == null ? void 0 : _b[name];
    }
    if (!component) {
      throw new Error(`Failed to find Vue Component '${name}'`);
    }
    return component;
  }
  function mountVueComponent(component, parent, props, element) {
    let vNode = vue.createVNode(component, Object.freeze(props));
    vNode.appContext = parent.appContext;
    vNode.appContext.provides = {
      ...vNode.appContext.provides ? vNode.appContext.provides : {},
      ...parent.provides ? parent.provides : {}
    };
    vue.render(vNode, element);
    let runningProps = props;
    return {
      update: (newProps) => {
        runningProps = { ...props, ...newProps };
        vNode = vue.cloneVNode(vNode, runningProps);
        vue.render(vNode, element);
      },
      dispose: () => {
        vue.render(null, element);
      }
    };
  }
  class AbstractVueRenderer {
    constructor(component, parent) {
      __publicField(this, "_element");
      this.component = component;
      this.parent = parent;
      this._element = document.createElement("div");
      this.element.className = "dv-vue-part";
      this.element.style.height = "100%";
      this.element.style.width = "100%";
    }
    get element() {
      return this._element;
    }
  }
  class VueRenderer extends AbstractVueRenderer {
    constructor() {
      super(...arguments);
      __publicField(this, "_renderDisposable");
      __publicField(this, "_api");
      __publicField(this, "_containerApi");
    }
    init(parameters) {
      var _a;
      this._api = parameters.api;
      this._containerApi = parameters.containerApi;
      const props = {
        params: parameters.params,
        api: parameters.api,
        containerApi: parameters.containerApi,
        tabLocation: parameters.tabLocation
      };
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
      this._renderDisposable = mountVueComponent(
        this.component,
        this.parent,
        { params: props },
        this.element
      );
    }
    update(event) {
      var _a;
      if (!this._api || !this._containerApi) {
        return;
      }
      const params = event.params;
      (_a = this._renderDisposable) == null ? void 0 : _a.update({
        params: {
          params,
          api: this._api,
          containerApi: this._containerApi
        }
      });
    }
    dispose() {
      var _a;
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
    }
  }
  class VueWatermarkRenderer extends AbstractVueRenderer {
    constructor() {
      super(...arguments);
      __publicField(this, "_renderDisposable");
    }
    get element() {
      return this._element;
    }
    init(parameters) {
      var _a;
      const props = {
        group: parameters.group,
        containerApi: parameters.containerApi
      };
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
      this._renderDisposable = mountVueComponent(
        this.component,
        this.parent,
        { params: props },
        this.element
      );
    }
    update(event) {
    }
    dispose() {
      var _a;
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
    }
  }
  class VueHeaderActionsRenderer extends AbstractVueRenderer {
    constructor(component, parent, group) {
      super(component, parent);
      __publicField(this, "_renderDisposable");
    }
    get element() {
      return this._element;
    }
    init(props) {
      var _a;
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
      this._renderDisposable = mountVueComponent(
        this.component,
        this.parent,
        { params: props },
        this.element
      );
    }
    dispose() {
      var _a;
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
    }
  }
  class VuePart {
    constructor(element, vueComponent, parent, props) {
      __publicField(this, "_renderDisposable");
      this.element = element;
      this.vueComponent = vueComponent;
      this.parent = parent;
      this.props = props;
    }
    init() {
      var _a;
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
      this._renderDisposable = mountVueComponent(
        this.vueComponent,
        this.parent,
        this.props,
        this.element
      );
    }
    update(props) {
      var _a;
      this.props = { ...this.props, ...props };
      (_a = this._renderDisposable) == null ? void 0 : _a.update(this.props);
    }
    dispose() {
      var _a;
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
    }
  }
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "@bobliu0518/dockview",
    props: {
      disableAutoResizing: { type: Boolean },
      hideBorders: { type: Boolean },
      singleTabMode: {},
      disableFloatingGroups: { type: Boolean },
      floatingGroupBounds: {},
      popoutUrl: {},
      defaultRenderer: {},
      debug: { type: Boolean },
      dndEdges: { type: [Boolean, Object] },
      rootOverlayModel: {},
      disableDnd: { type: Boolean },
      locked: { type: Boolean },
      className: {},
      noPanelsOverlay: {},
      theme: {},
      disableTabsOverflowList: { type: Boolean },
      scrollbars: {},
      watermarkComponent: {},
      defaultTabComponent: {},
      rightHeaderActionsComponent: {},
      leftHeaderActionsComponent: {},
      prefixHeaderActionsComponent: {}
    },
    emits: ["ready", "didSashChange"],
    setup(__props, { emit: __emit }) {
      function extractCoreOptions(props2) {
        const coreOptions = dockviewCore.PROPERTY_KEYS_DOCKVIEW.reduce((obj, key) => {
          obj[key] = props2[key];
          return obj;
        }, {});
        return coreOptions;
      }
      const emit = __emit;
      const props = __props;
      const el = vue.ref(null);
      const instance = vue.ref(null);
      dockviewCore.PROPERTY_KEYS_DOCKVIEW.forEach((coreOptionKey) => {
        vue.watch(
          () => props[coreOptionKey],
          (newValue, oldValue) => {
            if (instance.value) {
              instance.value.updateOptions({ [coreOptionKey]: newValue });
            }
          }
        );
      });
      vue.onMounted(() => {
        if (!el.value) {
          throw new Error("dockview-vue: element is not mounted");
        }
        const inst = vue.getCurrentInstance();
        if (!inst) {
          throw new Error("dockview-vue: getCurrentInstance() returned null");
        }
        const frameworkOptions = {
          createComponent(options) {
            const component = findComponent(inst, options.name);
            return new VueRenderer(component, inst);
          },
          createTabComponent(options) {
            let component = findComponent(inst, options.name);
            if (!component && props.defaultTabComponent) {
              component = findComponent(inst, props.defaultTabComponent);
            }
            if (component) {
              return new VueRenderer(component, inst);
            }
            return void 0;
          },
          createWatermarkComponent: props.watermarkComponent ? () => {
            const component = findComponent(
              inst,
              props.watermarkComponent
            );
            return new VueWatermarkRenderer(component, inst);
          } : void 0,
          createLeftHeaderActionComponent: props.leftHeaderActionsComponent ? (group) => {
            const component = findComponent(
              inst,
              props.leftHeaderActionsComponent
            );
            return new VueHeaderActionsRenderer(component, inst, group);
          } : void 0,
          createPrefixHeaderActionComponent: props.prefixHeaderActionsComponent ? (group) => {
            const component = findComponent(
              inst,
              props.prefixHeaderActionsComponent
            );
            return new VueHeaderActionsRenderer(component, inst, group);
          } : void 0,
          createRightHeaderActionComponent: props.rightHeaderActionsComponent ? (group) => {
            const component = findComponent(
              inst,
              props.rightHeaderActionsComponent
            );
            return new VueHeaderActionsRenderer(component, inst, group);
          } : void 0
        };
        const api = dockviewCore.createDockview(el.value, {
          ...extractCoreOptions(props),
          ...frameworkOptions
        });
        const { clientWidth, clientHeight } = el.value;
        api.layout(clientWidth, clientHeight);
        instance.value = vue.markRaw(api);
        api.onDidSashChange(() => {
          emit("didSashChange");
        });
        emit("ready", { api });
      });
      vue.onBeforeUnmount(() => {
        if (instance.value) {
          instance.value.dispose();
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "el",
          ref: el
        }, null, 512);
      };
    }
  });
  function useViewComponent(config, props, emit) {
    const el = vue.ref(null);
    const instance = vue.ref(null);
    config.propertyKeys.forEach((coreOptionKey) => {
      vue.watch(
        () => props[coreOptionKey],
        (newValue) => {
          if (instance.value) {
            instance.value.updateOptions({
              [coreOptionKey]: newValue
            });
          }
        }
      );
    });
    vue.watch(
      () => props.components,
      () => {
        if (instance.value) {
          const inst = vue.getCurrentInstance();
          if (!inst) {
            throw new Error(
              `${config.componentName}: getCurrentInstance() returned null`
            );
          }
          instance.value.updateOptions({
            createComponent: (options) => {
              const component = findComponent(inst, options.name);
              return config.createView(
                options.id,
                options.name,
                component,
                inst
              );
            }
          });
        }
      }
    );
    vue.onMounted(() => {
      if (!el.value) {
        throw new Error(`${config.componentName}: element is not mounted`);
      }
      const inst = vue.getCurrentInstance();
      if (!inst) {
        throw new Error(
          `${config.componentName}: getCurrentInstance() returned null`
        );
      }
      const frameworkOptions = {
        createComponent(options) {
          const component = findComponent(inst, options.name);
          return config.createView(
            options.id,
            options.name,
            component,
            inst
          );
        }
      };
      const api = config.createApi(el.value, {
        ...config.extractCoreOptions(props),
        ...frameworkOptions
      });
      const { clientWidth, clientHeight } = el.value;
      api.layout(clientWidth, clientHeight);
      instance.value = vue.markRaw(api);
      api.onDidSashChange(() => {
        emit("didSashChange");
      });
      emit("ready", { api });
    });
    vue.onBeforeUnmount(() => {
      if (instance.value) {
        instance.value.dispose();
      }
    });
    return {
      el,
      instance
    };
  }
  class VueSplitviewPanelView extends dockviewCore.SplitviewPanel {
    constructor(id, component, vueComponent, parent) {
      super(id, component);
      this.vueComponent = vueComponent;
      this.parent = parent;
    }
    getComponent() {
      var _a;
      return new VuePart(
        this.element,
        this.vueComponent,
        this.parent,
        {
          params: ((_a = this._params) == null ? void 0 : _a.params) ?? {},
          api: this.api,
          containerApi: new dockviewCore.SplitviewApi(
            this._params.accessor
          )
        }
      );
    }
  }
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "splitview",
    props: {
      components: {},
      disableAutoResizing: { type: Boolean },
      className: {},
      orientation: {},
      descriptor: {},
      proportionalLayout: { type: Boolean },
      styles: {},
      margin: {}
    },
    emits: ["ready", "didSashChange"],
    setup(__props, { emit: __emit }) {
      function extractCoreOptions(props2) {
        const coreOptions = dockviewCore.PROPERTY_KEYS_SPLITVIEW.reduce(
          (obj, key) => {
            obj[key] = props2[key];
            return obj;
          },
          {}
        );
        return coreOptions;
      }
      const emit = __emit;
      const props = __props;
      const { el } = useViewComponent({
        componentName: "splitview-vue",
        propertyKeys: dockviewCore.PROPERTY_KEYS_SPLITVIEW,
        createApi: dockviewCore.createSplitview,
        createView: (id, name, component, instance) => new VueSplitviewPanelView(id, name, component, instance),
        extractCoreOptions
      }, props, emit);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "el",
          ref: el,
          style: { "height": "100%", "width": "100%" }
        }, null, 512);
      };
    }
  });
  class VueGridviewPanelView extends dockviewCore.GridviewPanel {
    constructor(id, component, vueComponent, parent) {
      super(id, component);
      this.vueComponent = vueComponent;
      this.parent = parent;
    }
    getComponent() {
      var _a;
      return new VuePart(
        this.element,
        this.vueComponent,
        this.parent,
        {
          params: ((_a = this._params) == null ? void 0 : _a.params) ?? {},
          api: this.api,
          containerApi: new dockviewCore.GridviewApi(
            this._params.accessor
          )
        }
      );
    }
  }
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "gridview",
    props: {
      components: {},
      disableAutoResizing: { type: Boolean },
      proportionalLayout: { type: Boolean },
      orientation: {},
      className: {},
      hideBorders: { type: Boolean }
    },
    emits: ["ready", "didSashChange"],
    setup(__props, { emit: __emit }) {
      function extractCoreOptions(props2) {
        const coreOptions = dockviewCore.PROPERTY_KEYS_GRIDVIEW.reduce(
          (obj, key) => {
            obj[key] = props2[key];
            return obj;
          },
          {}
        );
        return coreOptions;
      }
      const emit = __emit;
      const props = __props;
      const { el } = useViewComponent({
        componentName: "gridview-vue",
        propertyKeys: dockviewCore.PROPERTY_KEYS_GRIDVIEW,
        createApi: dockviewCore.createGridview,
        createView: (id, name, component, instance) => new VueGridviewPanelView(id, name, component, instance),
        extractCoreOptions
      }, props, emit);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "el",
          ref: el,
          style: { "height": "100%", "width": "100%" }
        }, null, 512);
      };
    }
  });
  class VuePaneviewPanelView {
    constructor(id, vueComponent, parent) {
      __publicField(this, "_element");
      __publicField(this, "part");
      this.id = id;
      this.vueComponent = vueComponent;
      this.parent = parent;
      this._element = document.createElement("div");
      this._element.style.height = "100%";
      this._element.style.width = "100%";
    }
    get element() {
      return this._element;
    }
    init(parameters) {
      this.part = new VuePart(
        this.element,
        this.vueComponent,
        this.parent,
        {
          params: parameters.params,
          api: parameters.api,
          title: parameters.title,
          containerApi: parameters.containerApi
        }
      );
      this.part.init();
    }
    toJSON() {
      return {
        id: this.id
      };
    }
    update(params) {
      var _a;
      (_a = this.part) == null ? void 0 : _a.update({ params: params.params });
    }
    dispose() {
      var _a;
      (_a = this.part) == null ? void 0 : _a.dispose();
    }
  }
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "paneview",
    props: {
      components: {},
      disableAutoResizing: { type: Boolean },
      disableDnd: { type: Boolean },
      className: {}
    },
    emits: ["ready", "didSashChange"],
    setup(__props, { emit: __emit }) {
      function extractCoreOptions(props2) {
        const coreOptions = dockviewCore.PROPERTY_KEYS_PANEVIEW.reduce(
          (obj, key) => {
            obj[key] = props2[key];
            return obj;
          },
          {}
        );
        return coreOptions;
      }
      const emit = __emit;
      const props = __props;
      const { el } = useViewComponent({
        componentName: "paneview-vue",
        propertyKeys: dockviewCore.PROPERTY_KEYS_PANEVIEW,
        createApi: dockviewCore.createPaneview,
        createView: (id, name, component, instance) => new VuePaneviewPanelView(id, component, instance),
        extractCoreOptions
      }, props, emit);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "el",
          ref: el,
          style: { "height": "100%", "width": "100%" }
        }, null, 512);
      };
    }
  });
  exports2.DockviewVue = _sfc_main$3;
  exports2.GridviewVue = _sfc_main$1;
  exports2.PaneviewVue = _sfc_main;
  exports2.SplitviewVue = _sfc_main$2;
  exports2.VueHeaderActionsRenderer = VueHeaderActionsRenderer;
  exports2.VuePart = VuePart;
  exports2.VueRenderer = VueRenderer;
  exports2.VueWatermarkRenderer = VueWatermarkRenderer;
  exports2.findComponent = findComponent;
  exports2.mountVueComponent = mountVueComponent;
  Object.keys(dockviewCore).forEach((k) => {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports2, k))
      Object.defineProperty(exports2, k, {
        enumerable: true,
        get: () => dockviewCore[k]
      });
  });
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
