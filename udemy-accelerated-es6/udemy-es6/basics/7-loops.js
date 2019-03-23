//LOOPS (for IN, for OF)

//for, while, do while,

//==== for in (loop throw properties in OBJECT) ====

let obj = {
    name: "Zoki",
    age: 35,
    greet() {
        console.log('Hi ' + this.name);
    }
}

for (let prop in obj) {
    console.log(prop); // return property names: "name", "age", "greet"
    console.log(obj[prop]); // return property values
}


//==== for of (looping throw ARRAYS) =========

let numbers = [1, 2, 3];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]); //1,2,3
}


// let + for
// https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md#let--for
// The only exception I'd make to the preference for the explicit form of let declaration
// blocking is a let that appears in the header of a for loop. The reason may seem nuanced, but I believe it to be one of the more important ES6 features.

var funcs = [];

for (let i = 0; i < 5; i++) {
	funcs.push( function(){
		console.log( i );
	} );
}

funcs[3]();		// 3
//The let i in the for header declares an i not just for the for loop itself,
// but it redeclares a new i for each iteration of the loop. That means that closures created inside the loop iteration close over those per-iteration variables the way you'd expect.


//with FOR OF - we can us like this
for (let el of numbers) {
    console.log(el); //1,2,3
}