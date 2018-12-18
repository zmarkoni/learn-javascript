NC = window.NC || {
  components: {}
};

NC.components.Base = function (el, name, config) {
  return {
    name: name,
    el: el,
    config: config,
    init: function () {
      throw new Error(this.name + ': Missing init() function');
    }
  }
};
