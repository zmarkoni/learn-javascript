NC = window.NC || {
  components: {}
};

NC.components.cookieSwitch = {
  init: function () {
    this.options = $.extend({}, this.config);
    this.setRefs();
    this.setEventListeners();
  },

  setRefs: function () {
    this.buttonAccept = this.el.querySelector('.cookieswitch__button--allow');
    this.buttonDeny = this.el.querySelector('.cookieswitch__button--deny');
  },

  setEventListeners: function () {
    if (this.buttonAccept) {
      this.buttonAccept.addEventListener('click', function(e) {
        e.preventDefault();
        NC.modules.cookie.setCookie('cookieconsent_status', 'allow', 7);
        location.reload(true);
      });
    }

    if (this.buttonDeny) {
      this.buttonDeny.addEventListener('click', function(e) {
        e.preventDefault();
        NC.modules.cookie.setCookie('cookieconsent_status', 'deny', 2);
        location.reload(true);
      });
    }
  },

};

NC.modules.componentLoader.register(NC.components.cookieSwitch, 'CookieSwitch');
