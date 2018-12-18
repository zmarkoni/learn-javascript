NC = window.NC || {
  modules: {}
};

NC.modules.queryParam = {
  getValue: function (name) {
  	const query = window.location.search.substring(1);
  	const pairs = query.split('&');
  	for (let i=0; i < pairs.length; i++) {
  		const pair = pairs[i].split('=');
  		if (pair[0] === name) {
  		  return pair[1];
  		}
  	}

  	return false;
  }
};

NC.modules.logger = {
  trace: function (type, args) {
    if (NC.modules.queryParam.getValue('tracenc')) {
      console[type].apply(console, args);
    }
  },

  error: function () {
    this.trace('error', arguments);
  },

  warn: function () {
    this.trace('warn', arguments);
  },

  log: function () {
    this.trace('log', arguments);
  }
};
