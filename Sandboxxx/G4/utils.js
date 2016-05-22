;(function() {

    function Utils() {};

    Utils.prototype = {

        isArray: function(value)
        {
            return value &&
                   typeof value == 'object' &&
                   typeof value.length == 'number' &&
                   toString.call(value) == '[object Array]' ||
                   false;
        },

        isNull: function(value)
        {
            return value === null;
        },

        isUndefined: function(value)
        {
            return typeof value == 'undefined';
        },

        isEmpty: function(value)
        {
            return this.isUndefined(value)
                || this.isNull(value)
                || !value
                || value.length == 0;
        },

        sliceObj: function(obj, start, end)
        {
            var sliced = {};
            var i = 0;
            for (var key in obj) {
                if (i >= start && i < end)
                    sliced[key] = obj[key];

                i++;
            }
            return sliced;
        }
    };

    if ((typeof module != 'undefined') && (module.exports)) { // Node Module

        module.exports = new Utils();

    } else if (typeof define != 'undefined' && define.hasOwnProperty('amd') && define.amd) { // RequireJS AMD

        define(function(){
            return new Utils();
        });

    } else if (typeof window != 'undefined') { // Fall back to attaching to window

        window.g4Utils = new Utils();
    };
}.call(this));