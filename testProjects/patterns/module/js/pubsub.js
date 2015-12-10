  //events - a super-basic Javascript (publish subscribe) pattern

var events = {
  events: {},

  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  emit: function (eventName, data) {  //eventName = "peopleChanged", data = 1
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) { //fn = setPeople(newPeople)
        fn(data);
      });
    }
  }
};