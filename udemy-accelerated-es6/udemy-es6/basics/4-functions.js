// https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md#arrow-functions
/*
Arrow functions are always function expressions; there is no arrow function declaration.
It also should be clear that they are anonymous function expressions -- they have no named
reference for the purposes of recursion or event binding/unbinding -- though "Function Names"
in Chapter 7 will describe ES6's function name inference rules for debugging purposes.

Note: All the capabilities of normal function parameters are available to arrow functions,
including default values, destructuring, rest parameters, and so on.

Starting with ES6, function declarations that occur inside of blocks are now specified to
be scoped to that block. Prior to ES6, the specification did not call for this,
but many implementations did it anyway. So now the specification meets reality.
*/

// (function IIFE(){
// 	foo();					// works!
//
// 	function foo() {
// 		console.log('foo is called');
// 	}
// })();
//
// foo(); // ReferenceError

// if (true) {
// 	function foo() {
// 		console.log( "1" );
// 	}
// }
// else {
// 	function foo() {
// 		console.log( "2" );
// 	}
// }

//foo();

//====== old way =======

function oldFunc() {
    console.log('Hello');
}
//oldFunc();

let oldFn = () => {
    console.log('Hi');
}
//oldFn();

// if we have one line of code
let oldFn1 = () => console.log('Hi 1');
//oldFn1();

function oldFn2() {
    return 'Hi 2';
}
//console.log(oldFn2());

// if we have one line of code
let oldFn3 = () => 'Hi 3'; // return
//console.log(oldFn3());

// if we have more than one line of code
let oldFn4 = (a, b) => {
  return a + b
}
//console.log(oldFn4(3, 8)); // 11

// SPECIAL CASE, if we have one argument we can leave parentheses
let oldFn5 = a => a + 5;
//console.log(oldFn5(1)); // 6
//setTimeout(() => console.log('Hello'), 1000);

//======= (Fat) Arrow Functions and the "this” Keyword =======

function fn() {
    console.log(this);
}
//fn(); // window object

let fn2 = () => console.log(this);
//fn2(); // window object

// === with button ====
let button = document.querySelector('button');

function fn3() {
    console.log(this);
}
//'this' always reference to the left side of whatever call the function, check JS/this
button.addEventListener('click', fn3); // object HTMLButtonElement // <button>button</button>

// no need of bind, apply, call
let fn4 = () => console.log(this);

//this is treated differently with arrow functions, THIS keep it's context within function!!!
button.addEventListener('click', fn4); // window obj in this case

// more example: https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md#not-just-shorter-syntax-but-this
/*
Not Just Shorter Syntax, But this
Most of the popular attention toward => has been on saving those precious keystrokes by dropping function,
return, and { .. } from your code.
But there's a big detail we've skipped over so far. I said at the beginning of the section that => functions are closely
related to this binding behavior. In fact, => arrow functions are primarily designed to
alter this behavior in a specific way, solving a particular and common pain point with this-aware coding.
The saving of keystrokes is a red herring, a misleading sideshow at best.
Let's revisit another example from earlier in this chapter:
*/
// var controller = {
// 	makeRequest: function(..){
// 		var self = this;
//
// 		btn.addEventListener( "click", function(){
// 			// ..
// 			self.makeRequest(..);
// 		}, false );
// 	}
// };

/*
We used the var self = this hack, and then referenced self.makeRequest(..), because inside the callback function
we're passing to addEventListener(..), the this binding will not be the same as it is in makeRequest(..) itself.
In other words, because this bindings are dynamic, we fall back to the predictability of lexical scope via the
self variable.
Herein we finally can see the primary design characteristic of => arrow functions. Inside arrow functions,
the this binding is not dynamic, but is instead lexical. In the previous snippet, if we used an arrow function
for the callback, this will be predictably what we wanted it to be.
*/
// var controller = {
//     makeRequest: function(..){
//         btn.addEventListener( "click", () => {
//             this.makeRequest(..)
//         }, false);
//     }
// };


//======= Functions and Default Parameters =======
function isEqualTo(number, compare = 10) {  // compare parameter - have default value
  return number == compare;
}
//console.log(isEqualTo(10)); // true

// arrow funkcija, i gore radi isto sa starom
var isEqualTo1 = (number, compare = 10) => number == compare;
//console.log(isEqualTo1(10)); // true

let a = 100;
var isEqualTo1 = (number, compare = a) => {
  console.log(number);  // 10
  console.log(compare); // 100
  return number == compare;
}

//console.log(isEqualTo1(10)); // false