/*
	Why Mocking
		Isolation
		Easy flow control
		Remove integration with complex systems or external systems
		Testing interactions
 */
var MyClass = function() {	
};

MyClass.prototype.Method1 = function() {
	console.log('inside method1');
	return true;
};

var MySubclass = function() {
};
MySubclass.prototype = new MyClass();

MySubclass.prototype.Method2 = function() {
	console.log('inside method4');
	return 'something';
};

// Version 1
// Spy to replace our methods,  when we call method, we get spy implementation,
// we can track how often is called and with witch arguments
function SpyOn(classToSpyOn) {
    for(var key in classToSpyOn) {
        classToSpyOn[key] = CreateSpy(key);
    }
}

function CreateSpy(key) {
    return function () {
        console.log('I am a spy for ' + key);
    }
}


// version 2
// Spy to intercept function call, to be between calls and our methods
// Actual code is run, the real implementation
function SpyOnThrough(classToSpyOn) {
    for(var key in classToSpyOn) {
        classToSpyOn[key] = CreateSpyPassthrough(key, classToSpyOn, classToSpyOn[key]);
    }
}

function CreateSpyPassthrough(key, objContext, originalFunction) {
    var passtroughtSpy = function () {
        console.log('I am a passthrough spy for ' + key);
        return originalFunction.apply(objContext, arguments);
    };

    return passtroughtSpy;
}

var mysubclass = new MySubclass();
//SpyOn(mysubclass); // mutate this object, becomes a spy

SpyOnThrough(mysubclass); // mutate this object, becomes a spy

mysubclass.Method1();
mysubclass.Method2();