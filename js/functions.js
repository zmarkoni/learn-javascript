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

// =============== FUNCTIONS =============================================

// THE METHOD INVOCATION PATTERN
var myObj = {
	value: 0, //property
	increment: function (inc) {
		//var value = 10; // value = 10 - ne cita je
		//this.value = 0 i dalje VAZNO!!!
		this.value += typeof inc === 'number' ? inc : 1;
	}
	
};//Objekat se zavrsava tackom i zarezom uvek, a metod ne 

//myObj.increment(1);
myObj.increment(11);
//print(myObj.value);

//The Function invocation pattern		

//dodajem novi metod
myObj.double = function () {
	var that = this; // Workaround.
	//Ovde bi radilo
	//return add(this.value, this.value);

	var helper = function () {
	    //Unutrasnja funkcija vidi this kao globalnu	
	    //this.value = add(this.value, this.value); ne moze
	    that.value = that.value + that.value;
	};

	helper(); // Invoke helper as a function.
};	


// Invoke double as a method.				
myObj.double();
//print(myObj.value);

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

// try_it();

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


// ===============  Closure	 =============================================
//Closures are functions that have access to variables from another function’s scope. 
//This is often accomplished by creating a function inside a function

/*When a function is called, an execution context is created, and its scope chain is created. 
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

//=====  Closures and variables	=====
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
//property called name. The object contains a method, getNameFunc(), that returns an anonymous function, which returns this.name. Since getNameFunc() returns a function, calling object .getNameFunc()() immediately calls the function that is returned, which returns a string. In this case, however, it returns “The Window”, which is the value of the global name variable. Why didn’t the anonymous function pick up the containing scope’s this object?

var obj = {
	name:"My Object",

	getName: function(){
		var that = this;
		return function(){
			return that.name;
		};
	}
};

//print(obj.getName()()); //”The Object"

// Before defining the anonymous function, a variable named that is assigned equal to the this object. When the closure is defined, it has access to that, since it is a uniquely named variable in the containing function. Even after the function is returned, that is still bound to object, so calling object .getNameFunc()() returns “My Object”.


//Both this and arguments behave in this way. If you want access to a containing scope’s arguments object, you’ll need to save a reference into another variable that the closure can access.

var obj = {
	name:"My Object",

	getName: function(){
		return this.name;
	}
};
//print(obj.getName()); //”The Object"




