NC = window.NC || {
  components: {},
  modules: {},
  state: {}
};

NC.components.cookieNote = {
  init: function () {
    this.options = $.extend({}, this.config);
    this.initPlugin();
  },

  initPlugin: function () {
    const _this = this;

    window.cookieconsent.initialise({
      content: { // To avoid confusion parameters need to have same name like in dialog!!!
        message: _this.options.message, // Disclaimer Text *
        dismiss: _this.options.dismiss, // Decline text for HINT component /
        allow: _this.options.allow, // Allow Text Button
        deny: _this.options.deny, // Deny Text Button
        link: _this.options.link, // Policy Link Text
        href: _this.options.href, // Policy Link Path
        target: '_blank'
        //policy: 'Cookie Policy' // text in Revoke button / we be managed by SWITCH component
      },
      type: _this.options.type, // opt-in, opt-out, info, none
      layout: _this.options.layout, // top, bottom, left, right
      revokable: false, // we be managed by SWITCH component
      onStatusChange: function (status) {
        const type = _this.options.type || 'none';

        if ((type === 'opt-in' && status === 'allow')
        || type === 'opt-out' && status === 'deny') {
          location.reload(true);
        }
      }
    });
  },

  isCookiesAccepted: function (cookieMode) {
    const cookieValue = NC.modules.cookie.getCookie('cookieconsent_status'); // can be: [deny, allow, dismiss, none] where allow = dismiss

    if (cookieValue === 'deny' || (cookieMode === 'opt-in' && !cookieValue)) {
        return false;
    }

    return true;
  }
};

NC.modules.componentLoader.register(NC.components.cookieNote, 'CookieNote');
