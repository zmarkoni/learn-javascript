'strict';
//Destructuring Arrays

let numbers = [1, 2, 3];

// If I want 1 and 2

let one = numbers[0];
let two = numbers[1];
// console.log(one);
// console.log(two);

//instead of this we can write:

let [a, b, c, d = "Default"] = numbers;
console.log(a, b);
//console.log(numbers);
//console.log(d); // Default

//===== Omit some values with empty space ====
let newNumbers = [1, 2, 3];

let [a1, , c1] = newNumbers;
//console.log(a1, c1);

//==== destructuring without even declaring array ===
// Also we can use it to quickly initialise variables like this

let [x, y] = [10, 20];
//console.log(x, y);

//======= Quickly swap variables ======
let i = 5;
let j = 10;

[j, i] = [i, j];
//console.log(i, j);

//Consider array destructuring for parameters:

function foo( [ x, y ] ) {
	console.log( x, y );
}

foo( [ 1, 2 ] );					// 1 2
foo( [ 1 ] );						// 1 undefined
foo( [] );							// undefined undefined