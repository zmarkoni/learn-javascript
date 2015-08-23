// ============ Global variables ==========
// Jedan od nacina da se broj globalnih varijabli smanji na minimum je da definisemo jednu,
// koja postaje kontejner za aplikaciju

var APP = {}; //Create single global variable, it's becomes a NAMESPACE

//APP.placeholder = document.getElementById('placeholder');

//Novi objekat
APP.person = {
	first_name: "Zoran",
	gender : "male"
};
//Novi objekat koji nasledjuje propertije prethodnog var obj2 = Object.create(obj1);
APP.another_person = Object.create(APP.person); //Nasledio od preson-a sve
APP.another_person.last_name = 'Markovic'; // dodao sam nov property

//print(APP.person.first_name);
//print(APP.another_person.first_name +" "+ APP.another_person.last_name);

//=====	SCOPE =====
//As mentioned previously, JavaScript has no concept of block-level scoping,
//meaning variables defined inside of block statements are actually created
//in the containing function, not within the statement. Consider the following:

	function outputNumbers(count){
		for (var i = 0; i < count; i++){
			alert(i); //count numbers
		}
		print(i); //count - u drugim jezicima ne bi bilo dostupno
	}

	//outputNumbers(5);

	/*
	In this function, a for loop is defined and the variable i is initialized to be equal to 0.
	For languages such as Java and C++, the variable i would be defined only in the block statement representing the for loop,
	so the variable would be destroyed as soon as the loop completed.

	However, in JavaScript the variable i is defined as part of the outputNumbers() activation object,
	meaning it is accessible inside the function from that point on.
	Even the following errant redeclaration of the variable won’t wipe out its value:
	*/

	function outputNumbers1(count){
		for (var i = 0; i < count; i++){
			alert(i); //count numbers
		}

		var i = 10;  //variable redeclared - ne utice na i iz for petlje
		print(i); //10
	}

	//outputNumbers1(3);

	/*
	JavaScript will never tell you if you’ve declared the same variable more than once;
	it simply ignores all subsequent declarations (though it will honor initializations).
	Anonymous functions can be used to mimic block scoping and avoid such problems.
	*/

//===== VAZNO ====   PRIVATE SCOPE   =====

//The basic syntax of an anonymous function used as a block scope
//(often called a private scope) is as follows:
	(function(){})();

	// (function(){  //function se nalazi u zagradama kako bi simulirali function expression, posto obican function declaration ne moze imati na kraju zagrade
	// 	//block code here - private scope inside
	// 	for (var i = 0; i < 4; i++){
	// 		alert(i); //count i= 0,1,2,3
	// 	}
	// 	var i = 10; //variable redeclared - ne utice na i iz for petlje
	// 	print(i); //print 4
	// })(); //Samu sebe poziva


	var outputNumbers2 = function(){ //block code here
		for (var i = 0; i < 3; i++){
			alert(i); //count numbers - works
		}
		var i = 10; //variable redeclared - ne utice na i iz for petlje
		print(i); //print 3
	};

	//outputNumbers2();

//This pattern limits the closure memory problem, because there is no reference
//to the anonymous function. Therefore the scope chain can be
//destroyed immediately after the function has completed.


//===== VAZNO ====   PRIVATE Variables   =====
/*
Strictly speaking, JavaScript has no concept of private members; all object properties are public.
There is, however, a concept of private variables.
Any variable defined inside a function is considered private since it is inaccessible outside that function.
This includes function arguments, local variables, and functions defined inside other functions.
*/

function add(num1, num2){
	var sum = num1 + num2;
	return sum;
}

/*
In this function, there are three private variables: num1, num2, and sum.
These variables are accessible inside the function but can’t be accessed outside it.

If a closure were to be created inside this function, it would have access to these variables through its scope chain.
Using this knowledge, you can create public methods that have access to private variables.
*/

//===== privileged method ======
/*
A privileged method is a public method that has access to private variables and/or private functions.
There are two ways to create privileged methods on objects.
	1.The first is to do so inside a constructor, as in this example:
*/

function MyObject(){
	//private variables and functions

	var privateVariable = 10;

	function privateFunction(){
		print(privateVariable);
	}

	//privileged methods
	this.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	};
}

 var obj = new MyObject();
 //obj.privateFunction();//wont work because it is private
 //obj.publicMethod();

/*
This pattern defines all private variables and functions inside the constructor.
Then privileged methods can be created to access those private members.
This works because the privileged methods, when defined in the constructor,
become closures with full access to all variables and functions defined inside the constructor’s scope.

In this example, the variable privateVariable and the function privateFunction() are accessed only by publicMethod().
Once an instance of MyObject is created, there is no way to access privateVariable and privateFunction() directly;
you can do so only by way of publicMethod().
*/

//===== privileged method ======

/*
Privileged methods can also be created by using a private scope to define the private variables or functions.
The pattern is as follows:
*/
(function(){
	//private variables
	var privateVariable = 10;

	function privateFunction(){
		print(privateVariable);
	}

	//constructor
	MyObject = function(){};

	//public and privilaeged methods
	MyObject.prototype.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	};

})();

var obj = new MyObject();
//obj.publicMethod();

/*
In this pattern, a private scope is created to enclose the constructor and its methods.
The private variables and functions are defined first, followed by the constructor and the public methods.
Public methods are defined on the prototype, as in the typical prototype pattern.
Note that this pattern defines the constructor not by using a function declaration but instead by using a function expression.

>>> Function declarations always create ===local functions==, which is undesirable in this case.
For this same reason, the var keyword is not used with MyObject.

VAZNO
Remember: initializing an undeclared variable always creates a global variable,
so MyObject becomes global and available outside the private scope.
Also keep in mind that assigning to an undeclared variable in strict mode causes an error.
*/

/*
The main difference between this pattern and the previous one is that private variables and functions are shared among instances.
Since the privileged method is defined on the prototype, all instances use that same function.
The privileged method, being a closure, always holds a reference to the containing scope. Consider the following:
*/

(function(){
	var name = "";

	Person = function(value){
		name = value;
	};

	Person.prototype.getName = function(){
		print(name);
	};

	Person.prototype.setName = function (value){
		name = value;
	};
})();

var person1 = new Person('Nicholas');
//person1.getName(); //”Nicholas”

//person1.setName('Greg');
//person1.getName(); //”Greg”


var person2 = new Person('Michael');
//person1.getName(); //”Michael” //GRESKA - zbog toga sto The privileged method, being a closure, always holds a reference to the containing scope
//person2.getName(); //”Michael”

/*
The Person constructor in this example has access to the private variable name, as do the getName() and setName() methods.
Using this pattern, the name variable becomes static and will be used among all instances.
This means calling setName() on one instance affects all other instances.

Calling setName() or creating a new Person instance sets the name variable to a new value.
This causes all instances to return the same value.
Creating static private variables in this way allows for better code reuse through prototypes,
although each instance doesn’t have its own private variable. Ultimately,
the decision to use instance or static private variables needs to be based on your individual requirements.
*/

//============= Understanding Scope and Context ==============


