//REST and SPREAD Operators

//====== REST ============
// Kada radimo sa POLJIMA sve je ok
let numbers = [1,2,3];

// function sumUp(args) {
//   console.log(args);
//   let result = 0;
//   for(let i=0; i< args.length; i++) {
//     result += args[i];
//   }
//   return console.log(result);
// }
//
// sumUp(numbers); // 6

//ali kada imamo neku LISTU gde ne znamo koliko argumentata imamo onda smo u problemu
// So when we have some LIST of values
//REST parameter is actually 3 dots in front of argument! It will convert list of numbers to array of numbers

// function sumUp1(...args) { // REST parameter is actually 3 dots in front of argument
//   console.log(args);
//   let result = 0;
//   for(let i=0; i< args.length; i++) {
//     result += args[i];
//   }
//   return console.log(result);
// }
//
// sumUp1(1,2,3,4); // 60

//Note: The ...args in the foo(..) function declaration is usually called "rest parameters,"
// because you're collecting the rest of the parameters. I prefer "gather,"
// because it's more descriptive of what it does rather than what it contains.

// doing things the new ES6 way
function foo(...args) {
	// `args` is already a real array

	// discard first element in `args`
	//args.shift();

	// pass along all of `args` as arguments
	// to `console.log(..)`
	console.log( ...args );
}

// doing things the old-school pre-ES6 way
function bar() {
	// turn `arguments` into a real array
	var args = Array.prototype.slice.call( arguments );

	// add some elements on the end
	args.push( 4, 5 );
    console.log( args );
	// pass along all of `args` as arguments
	// to `foo(..)`
	foo.apply( null, args );
}

bar( 0, 1, 2, 3 );

// https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md#spreadrest

// When ... is used in front of an array (actually, any iterable, which we cover in Chapter 3),
// it acts to "spread" it out into its individual values.
// function foo(x,y,z) {
// 	console.log( x, y, z );
// }

//foo.apply( null, [1,2,3] ); // before
// foo( ...[1,2,3] );  // ES6


//====== SPREAD ============
//Spread is opposite of REST and it is used in Function call, to convert array to list of values

let newNumbers = [1,2,3];
//console.log(...newNumbers);
//console.log(Math.max(...newNumbers)); // 3


//But ... can be used to spread out/expand a value in other contexts as well, such as inside another array declaration:

var a = [2,3,4];
var b = [ 1, ...a, 5 ];

//console.log( b );					// [1,2,3,4,5]
//In this usage, ... is basically replacing concat(..), as it behaves like [1].concat( a, [5] ) here.

