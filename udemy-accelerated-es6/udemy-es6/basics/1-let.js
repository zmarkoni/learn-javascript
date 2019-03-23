//Let & Block Scope

let age = 30; //global scope

// if(true) {
//   let age = 20; // block scope , different variable
//   console.log(age); //20
// }
//
// console.log(age); // 30

// Create block scope with immediate invoking function
(function IIFE(){
	var age = 3;
	console.log( age );	// 3
})();

// or blok scope can be formed only with {} in ES6

{
    let age = 20; // block scope , different variable
      console.log(age); //20
}

console.log(age); // 30

// declaration of LET should always be at the of the block
{
	console.log( a );	// undefined
	console.log( b );	// ReferenceError!

	var a;
	let b;
}