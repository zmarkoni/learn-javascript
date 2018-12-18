NC = window.NC || {
  modules: {},
  componentsSet: []
};

NC.modules.componentLoader = {
  init: function () {
    this.loadAll(NC.componentsSet);
    this.defineAEMRenderer(NC.componentsSet);
  },

  register: function (component, name) {
    const isComponentAdded = NC.componentsSet.some(function(el) {
        return el.name === name;
    });

    if (!isComponentAdded) {
      NC.componentsSet.push({
          name: name,
          component: component
      });
    }
  },

  /**
   * Loads all components that will be available on each entry point
   *
   * @param {array} components - Set of components
   * @param {Document|HTMLElement} [parentEl] - The parent element where the
   *  components will be initialised
   */
  loadAll: function (components, parentEl) {
    parentEl = parentEl || document;
    const _this = this;

    components.forEach((component) => {
      const elements = [].slice.call(parentEl.querySelectorAll('[data-components~=' + component.name +']'));
      elements.forEach(function (el) {
        _this.loadOne(component.component, component.name, el);
      });
    });
  },

  loadOne: function (Component, componentName, el) {
    const params = el.getAttribute('data-component-param-' + componentName);
    if (Component) {
      let options = {};
      try {
        options = JSON.parse(params);
      } catch (e) {
        const errorTitle = componentName + ' ERROR:';
        const errorText = 'parsing data-component-param-' + componentName + '. It should be a correct JSON string';
        const errorEx = '(i.e. data-component-param-' + componentName + '=`{ "foo": "bar" }`)';
        NC.modules.logger.error(errorTitle, el, options, errorText, errorEx);
      }

      try {
        const instance = $.extend({}, NC.components.Base(el, componentName, options), Component);
        instance.init();
        NC.modules.logger.log(componentName + ' initialised', el, options);
      } catch (error) {
        NC.modules.logger.error(componentName + ' ERROR:', el, options, error);
      }
    }
  },

  /**
   * Defines a global function to re-render components when edited by the author
   * without the need to use REFRESH_SELF or REFRESH_PAGE AEM listeners.
   *
   * @param {array} components
   */
  defineAEMRenderer: function (components) {
    top.NC = top.NC || {};
    top.NC.reRender = function (dom) {
      if (dom && dom.length) {
        NC.modules.componentLoader.loadAll(components, dom[0]);
      }
    };
  }
};
