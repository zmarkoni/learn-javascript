// Scope and closures
// https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md



// ====== Modules ======

// Module revealing pattern
// he code snippet above shows a standalone module creator called CoolModule()
// which can be invoked any number of times, each time creating a new module instance.
function CoolModule() {
    var something = 'Module revealing pattern',
        another = [1, 2, 3];

    function doSomething() {
        console.log( something );
    }

    function doAnother() {
        console.log( another.join(' ! ') );
    }

    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}

// var foo = CoolModule();
// foo.doSomething();
// foo.doAnother();

// Singleton Module revealing pattern
// A slight variation on this pattern is when you only care to have one instance, a "singleton" of sorts:
var singleton = (function CoolModule() {
    var something = 'Singleton module',
        another = [4, 5, 6];

    function doSomething() {
        console.log( something );
    }

    function doAnother() {
        console.log( another.join(' ! ') );
    }

    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
})();
// Here, we turned our module function into an IIFE (see Chapter 3), and we immediately invoked it and
// assigned its return value directly to our single module instance identifier 'singleton'.

//singleton.doSomething();
//singleton.doAnother();

// Another slight but powerful variation on the module pattern is to name the object you are returning as your public API:
var foo = (function CoolModule(id) {
	function change() {
		// modifying the public API
		publicAPI.identify = identify2;
	}

	function identify1() {
		console.log( id );
	}

	function identify2() {
		console.log( id.toUpperCase() );
	}

	var publicAPI = {
		change: change,
		identify: identify1
	};

	return publicAPI;
})( "foo module" );

// foo.identify(); // foo module
// foo.change();
// foo.identify(); // FOO MODULE
//By retaining an inner reference to the public API object inside your module instance,
// you can modify that module instance from the inside, including adding and removing methods,
// properties, and changing their values.

//Modern Modules
//Various module dependency loaders/managers essentially wrap up this pattern of module definition
// into a friendly API. Rather than examine any one particular library, let me present a very
// simple proof of concept for illustration purposes (only):

var MyModules = (function Manager() {
	var modules = {};

	function define(name, deps, impl) {
		for (var i=0; i<deps.length; i++) {
			deps[i] = modules[deps[i]];
		}
		modules[name] = impl.apply( impl, deps );
	}

	function get(name) {
		return modules[name];
	}

	return {
		define: define,
		get: get
	};
})();

// The key part of this code is modules[name] = impl.apply(impl, deps).
// This is invoking the definition wrapper function for a module (passing in any dependencies),
// and storing the return value, the module's API, into an internal list of modules tracked by name.

// And here's how I might use it to define some modules:

MyModules.define( "bar", [], function(){
	function hello(who) {
		return "Let me introduce: " + who;
	}

	return {
		hello: hello
	};
} );

MyModules.define( "foo", ["bar"], function(bar){
	var hungry = "hippo";

	function awesome() {
		console.log( bar.hello( hungry ).toUpperCase() );
	}

	return {
		awesome: awesome
	};
} );

var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );

console.log(
	bar.hello( "hippo" )
); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO
// Both the "foo" and "bar" modules are defined with a function that returns a public API.
// "foo" even receives the instance of "bar" as a dependency parameter, and can use it accordingly.
