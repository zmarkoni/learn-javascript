// =============== FUNCTIONS =============================================

//Function declaration vs function expression ?
//See bottom
//Regular function declaration
function sayHi(){
	alert("Hi!");
}
//call the function
//sayHi();

//Function expressions
var functionName = function(arg0, arg1, arg2){
	print(arg0 + ' ' + arg1 + ' ' + arg2);
};
//call function
//functionName(1,2,3);

/*
	This pattern of function expression looks like a normal variable assignment.
	A function is created and assigned to the variable functionName.
	The created function is considered to be an anonymous function,
	because it has no identifier after the function keyword.
	This means the name property is the empty string.

	The ability to create functions for assignment to variables also allows you to return functions as the value of other functions.
	*/

// THE METHOD INVOCATION PATTERN
var myObj = {
	value: 0, //property
	increment: function (inc) {
		var value = 10; // value = 10 - ne cita je
		//this.value = 0 i dalje VAZNO//!!!
		this.value += typeof inc === 'number' ? inc : 1;
		return this.return_value(this.value); //pozivam metodu odozdo
	},
	return_value : function (result) {
		return print(result);
		//return value;
	}
}; //Objekat se zavrsava tackom i zarezom uvek, a metod ne

// myObj.increment(1);
// myObj.increment(10);

myObj.double = function () {
	var that = this; // Workaround.
	//Ovde bi radilo
	//return increment(this.value, this.value);
	var helper = function () {
	    //Unutrasnja funkcija vidi this kao globalnu
	    //this.value = increment(this.value, this.value); ne moze
	    that.value = myObj.increment(that.value, that.value);
	};

	helper(); // Invoke helper as a function.
};

// Invoke double as a method.
//myObj.double(5);

//Constructor invocation pattern
var Quo = function (string) {
    this.status = string;
};

//Give all instances of Quo a public method called get_status
Quo.prototype.get_status = function () {
    return print(this.status);
};

// Make an instance of Quo.
var myQuo = new Quo("confused");
//myQuo.get_status(); // confused

// ==== Apply invocation pattern

// Posto je JS fukncionalno objekto orjentisan, funkije mogu imati metode!
// Apply metod nam omogucava da kreiramo array(niz) argumenata za pozivanje funkcije. Omogucava nam da izaberemo vrednost this-a.

// Apply metod ima 2 parametra:
// 		Prvi je vrednost koja je vezana za this
// 		Drugi je niz parametara

//Make an array of 2 numbers and add them.
var array = [3, 4];
var sum = add.apply(null, array);  //this,parametar
// sum is 7

//Make an object with a status member.
var statusObject = {
	status: 'A-OK'
};

//statusObject does not inherit from Quo.prototype,but we can invoke the get_status method on
// statusObject even though statusObject does not have a get_status method.
//get_status smo nasedili iz Quo objekta gore
var status = Quo.prototype.get_status.apply(statusObject,null); // status is 'A-OK'


// ===============  Closure	 =============================================

//Closures are functions that have access to variables from another function’s scope.
//This is often accomplished by creating a function inside a function

/*
When a function is called, an execution context is created, and its scope chain is created.
The activation object for the function is initialized with values for arguments and any named arguments.

The outer function’s activation object is the second object in the scope chain.

This process continues for all containing functions until the scope chain terminates with the global execution context.
As the function executes, variables are looked up in the scope chain for the reading and writing of values.
*/

var myObject = function() {
	var value = 0;

	return {
		increment: function (inc) {
			value += typeof inc === 'number' ? inc : 3;
		},
		getValue: function (){
			return value;
		}
	}
}(); // uglaste zagrade na kraju, znace da se varijabli dodeljuje rezultat funkcije a ne funkcija

//Whenever a variable is accessed inside a function, the scope chain is searched for a variable with the given name.
//Once the function has completed, the local activation object is destroyed, leaving only the global scope in memory.
//Closures, however, behave differently.
//A function that is defined inside another function adds the containing function’s activation object into its scope chain.
//So, in createComparisonFunction(), the anonymous function’s scope chain actually contains a reference to the activation object for createComparisonFunction();

function createComparisonFunction(propertyName) {
	return function(object1, object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];

		if (value1 < value2){
			return -1;
		} else if (value1 > value2){
			return 1;
		} else {
			return 0;
		}
	};
}

/*
When the anonymous function is returned from createComparisonFunction(),
its scope chain has been initialized to contain the =activation object= from createComparisonFunction()
and the =global variable object=. This gives the anonymous function access to all of the variables from createComparisonFunction().

Another interesting side effect is that the =activation object= from createComparisonFunction() cannot be destroyed once the function finishes executing,
because a reference still exists in the anonymous function’s scope chain.
After createComparisonFunction() completes, the scope chain for its execution context is destroyed,
but its =activation object= will remain in memory until the anonymous function is destroyed, as in the following:
*/

//create function
var compareNames = createComparisonFunction('name');

//call function
var result = compareNames({ name: 'Nicholas' }, { name: 'Greg' });
//print(result);
//dereference function - memory can now be reclaimed
compareNames = null;
//print(result);

//=====  Closures and variables	SCOPE =====
/*
There is one notable side effect of this scope-chain configuration.
The closure always gets the last value of any variable from the containing function.
Remember that the closure stores a reference to the entire variable object,
not just to a particular variable.
This issue is illustrated clearly in the following example:*/
function createFunctions(){
	var result = new Array();

	for (var i=0; i < 10; i++){
		result[i] = function(){
			return i;
		};
	}
	return result;
}

/*
This function returns an array of functions. It seems that each function should just return the value of its index,
so the function in position 0 returns 0, the function in position 1 returns 1, and so on.
In reality, every function returns 10. Since each function has the createFunctions() activation object in its scope chain,
they are all referring to the same variable, i.
When createFunctions() finishes running, the value of i is 10, and since every function references the same variable object in which i exists,
the value of i inside each function is 10.
You can, however, force the closures to act appropriately by creating another anonymous function, as follows:
*/

function createFunction(){
	var result = new Array();

	for (var i = 0; i < 10; i++) {
		result[i] = function(num){
			return function(){
				return num;
			};
		}(i);
	}
	return result;
}

/*
With this version of createFunctions(), each function returns a different number.
Instead of assigning a closure directly into the array, an anonymous function is defined and called immediately.
The anonymous function has one argument, num, which is the number that the result function should return.
The variable = i = is passed in as an argument to the anonymous function.
Since function arguments are passed by value, the current value of i is copied into the argument num.
Inside the anonymous function, a closure that accesses num is created and returned.
Now each function in the result array has its own copy of num and thus can return separate numbers.
*/

//=====  this  ==== Object in clousers =====

/*Using the this object inside closures introduces some complex behaviors.
The =this= object is bound at runtime based on the context in which a function is executed:
	when used inside global functions, =this= is equal to window in nonstrict mode and
	undefined in strict mode, whereas =this= is equal to the object when called as an object method.

Anonymous functions are not bound to an object in this context, meaning the =this= object points to window
unless executing in strict mode (where this is undefined).
*/

var name = "The Window";


// var obj = {
// 	name:"My Object",

// 	getName: function(){
// 		return function(){
// 			return this.name;
// 		};
// 	}
// };

// print(obj.getName()()); //”The Window” (in non-strict mode)

//Here, a global variable called name is created along with an object that also contains a
//property called name. The object contains a method, getName(), that returns an anonymous function, which returns this.name. Since getName() returns a function,
//calling object .getName() immediately calls the function that is returned, which returns a string. In this case, however, it returns “The Window”, which is the value of the global name variable.
//Why didn’t the anonymous function pick up the containing scope’s this object?

var obj = {
	name:"My Object",

	getName: function(){
		var that = this;
		return function(){
			return that.name;
		};
	}
};

//print(obj.getName()()); //My Object"

// Before defining the anonymous function, a variable named that is assigned equal to the this object.
//When the closure is defined, it has access to that, since it is a uniquely named variable in the containing function.
//Even after the function is returned, that is still bound to object, so calling object .getName() returns “My Object”.


//Both this and arguments behave in this way. If you want access to a containing scope’s arguments object, you’ll need to save a reference into another variable that the closure can access.

var obj = {
	name:"My Object",

	getName: function(){ //nije closure
		return this.name;
	}
};
//print(obj.getName()); //”The Object"


//=====  The Module Pattern  ======= pitanje u Vegi!!!	==================================

/* =======Singletons
	Singletons are objects of which there will only ever be one instance.
	Traditionally, singletons are created in JavaScript using object literal notation, as shown in the following example:
	*/
	var singleton = {
		//name : value,
		method : function () {
		//method code here
	}
};

//The module pattern augments the basic singleton to allow for private variables and privileged methods
var singleton = function(){
	//private variables and functions
	var privateVariable = 10;
	function privateFunction(){
		return false;
	}

	//privileged/public methods and properties
	return {	//VAZNO

		publicProperty: true,

		publicMethod : function(){
			privateVariable++;
			return privateFunction();
		}
	};
}();

/*
The module pattern uses an anonymous function that returns an object. Inside of the anonymous function,
the private variables and functions are defined first.
After that, an object literal is returned as the function value.
That object literal contains only properties and methods that should be public.

VAZNOOOO
Since the object is defined inside the anonymous function, all of the public methods
have access to the private variables and functions.

Essentially, the object literal defines the public interface for the singleton.

This can be useful when the singleton requires some sort of initialization and access to private variables
*/

function BaseComponent(){}

var application = function(){
	//private variables and functions
	var components = new Array();

	//initialization
	components.push(new BaseComponent());

	//public interface
	return {
		getComponentCount : function(){
			return components.length;
		},

		registerComponent : function(component){
			if (typeof component == 'object'){
				components.push(component);
			}
		}
	};
}();

/*
In web applications, it’s quite common to have a singleton that manages application-level information.
This simple example creates an application object that manages components.
When the object is first created, the private components array is created and a new instance of BaseComponent is added to its list.
(The code for BaseComponent is not important; it is used only to show initialization in the example.)

The getComponentCount() and registerComponent() methods are ==privileged methods=== with access to the components array.
The former simply returns the number of registered components, and the latter registers a new component.

The module pattern is useful for cases like this, when a single object must be created and initialized
with some data and expose public methods that have access to private data.
Every singleton created in this manner is an instance of Object, since ultimately an object literal represents it.

This is inconsequential, because singletons are typically accessed globally instead of passed as arguments into a function,
which negates the need to use the instanceof operator to determine the object type.
*/

//===== The Module-Augmentation Pattern ========
/*
Another take on the module pattern calls for the augmentation of the object before returning it.

This pattern is useful when the singleton object needs to be an instance of a particular type but must be augmented
with additional properties and/or methods.

If the application object in the module pattern example had to be an instance of BaseComponent, the following code could be used:
*/
function BaseComponent(){}

var application = function(){
	//private variables and functions
	var components = new Array();

	//initialization
	components.push(new BaseComponent());

	//create a local copy of application
	var app = new BaseComponent();  //new instance of BaseComponent.

	//public interface
	app.getComponentCount = function() {
		return components.length;
	};

	app.registerComponent = function(component){
		if (typeof component == 'object'){
			components.push(component);
		}
	};

	//return it
	return app;

}();

/*
In this rewritten version of the application singleton, the private variables are defined first, as in the previous example.

The main difference is the creation of a variable named app that is a new instance of BaseComponent.

This is the local version of what will become the application object.

Public methods are then added onto the app object to access the private variables.

The last step is to return the app object, which assigns it to application.
*/


//============ The following is a summary of function expressions: ==========
/*

➤ Function expressions are different from function declarations. Function declarations require names, while function expressions do not.
  A function expression without a name is also called an anonymous function.

➤ With no definitive way to reference a function, recursive functions become more complicated.

➤ Recursive functions running in nonstrict mode may use arguments.callee to call themselves recursively
  instead of using the function name, which may change.

Closures are created when functions are defined inside other functions, allowing the closure access to all of the variables inside of the containing function, as follows:

	➤ Behind the scenes, the closure’s scope chain contains a variable object for itself, the containing function, and the global context.

	➤ Typically a function’s scope and all of its variables are destroyed when the function has finished executing.

	➤ When a closure is returned from that function, its scope remains in memory until the closure no longer exists.

Using closures, it’s possible to mimic block scoping in JavaScript, which doesn’t exist natively, as follows:

	➤ A function can be created and called immediately, executing the code within it but never leaving a reference to the function.

	➤ This results in all of the variables inside the function being destroyed unless they are specifically
	  set to a variable in the containing scope.

Closures can also be used to create private variables in objects, as follows:

	➤ Even though JavaScript doesn’t have a formal concept of private object properties,
	  closures can be used to implement public methods that have access to variables defined within the containing scope.

	➤ Public methods that have access to private variables are called privileged methods.

	➤ Privileged methods can be implemented on custom types using the constructor or prototype
	  patterns and on singletons by using the module or module-augmentation patterns.


Function expressions and closures are extremely powerful in JavaScript and can be used to accomplish many things.
Keep in mind that closures maintain extra scopes in memory, so overusing them may result in increased memory consumption.

=========== END ===============
*/


// =============== EXCEPTIONS =============================================

var add = function (a,b) {
	if(typeof a !== "number" || typeof b !== 'number'){
		throw {
			name: "TypeError",
			message: 'ADD needs numbers!'
		};
	}
	var result = a + b;
	print(result);
}

var try_it = function () {
	try {
		add('one','two');
		// add(1, 2);
	}catch(e) {
		print(e.name);
		print(e.message);
	}
}

//try_it();

// =============== RECURSION =============================================
/*
In this code, a named function expression f() is created and assigned to the variable factorial.
The name f remains the same even if the function is assigned to another variable,
so the recursive call will always execute correctly.
This pattern works in both nonstrict mode and strict mode.
*/
var factorial = (function f(num){
	if (num <= 1){
		return 1;
	} else {
		return num * f(num-1);
	}
});


