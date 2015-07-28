// ============ Global variables ==========
// Jedan od nacina da se broj globalnih varijabli smanji na minimum je da definisemo jednu, 
// koja postaje kontejner za aplikaciju	

var APP = {}; //Create single global variable, it's becomes a NAMESPACE

APP.placeholder = document.getElementById('placeholder');

APP.stooge = {
	first_name: "Zoran",
	gender : "male"
};

APP.another_stooge = Object.create(APP.stooge); //Nasledio od stooge-a sve
	APP.another_stooge.last_name = 'Markovic'; // dodao sam nov property

// print(MYAPP.stooge.first_name);
// print(MYAPP.another_stooge.first_name);
// print(MYAPP.another_stooge.last_name);

//=====	SCOPE =====
//As mentioned previously, JavaScript has no concept of block-level scoping, 
//meaning variables defined inside of block statements are actually created 
//in the containing function, not within the statement. Consider the following:
	
	function outputNumbers(count){
		for (var i = 0; i < count; i++){
			alert(i); //count numbers
		}

		print(i); //count 
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

	// (function(){  //function se nalazi u zagradama kako bi simulirali function expression, posto obican function declaration ne moze imati na kraju zagrade
	// 	//block code here - private scope inside
	// 	for (var i = 0; i < 4; i++){
	// 		alert(i); //count i= 0,1,2,3
	// 	}
	// 	//var i = 10; //variable redeclared - ne utice na i iz for petlje
	// 	print(i); //print 4
	// })(); //Samu sebe poziva


	var outputNumbers2 = function(){ //block code here
		for (var i = 0; i < 3; i++){
			alert(i); //count numbers - works
		}
		//var i = 10; //variable redeclared - ne utice na i iz for petlje
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


