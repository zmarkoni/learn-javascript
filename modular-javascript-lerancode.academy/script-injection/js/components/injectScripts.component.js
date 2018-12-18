NC = window.NC || {
  components: {},
  state: {}
};

NC.components.injectScripts = {
    init: function () {
      this.options = $.extend({}, this.config);
      this.setRefs();
      this.setEventListeners();
    },

    setEventListeners: function () {
      if (this.condition) {
        this.insertScriptTag(this.scriptParams);
      }
    },

    setRefs: function () {
      const _this = this;

      this.scriptParams = {
        src: _this.options.src,
        position: _this.options.position,
        onError: _this.handleError,
        onLoad: _this.handleLoad,
      };
      this.condition = NC.components.cookieNote.isCookiesAccepted(NC.state.cookieMode);
    },

    handleError: function (error) {
      NC.modules.logger.error('Injecting Script error', error);
    },

    handleLoad: function () {
      NC.modules.logger.log('Injecting Script loaded');
    },

    insertScriptTag: function (params) {
      const position = params.position || 'any';
      const onError = params.onError || function () {};
      const onLoad = params.onLoad || function () {};

      if (!params.src) {
        onError();
        return;
      }

      const $script = document.createElement('script');
      $script.async = true;
      $script.onerror = onError;
      $script.onload = onLoad;

      if (position === 'first') {
        const $firstScript = document.getElementsByTagName('script')[0] || null;
        $firstScript.parentNode.insertBefore($script, $firstScript);
      } else if (position === 'last') {
        document.body.appendChild($script);
      } else {
        document.head.appendChild($script);
      }

      $script.src = params.src;
    }
};

NC.modules.componentLoader.register(NC.components.injectScripts, 'InjectScripts');
