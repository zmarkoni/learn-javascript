'strict';
let obj = {
    name: 'Zoki',
    age: 27,
    greet: function () {
        console.log('Hello ' + this.name);
    },
    greet1: () => console.log('Hello ' + this.name)
};
//console.log(obj.name, obj.age);

let {name, age, greet} = obj; // variable names has to match with obj properties names

//console.log(name, age);
//greet(); // "Hello"  , should be "Hello Max"
//obj.greet(); // "Hello Max"

// we can use aliases
//let {greet: hello} = obj;
//hello();


//Object destructuring for parameters works, too:

function foo( { x, y } ) {
	console.log( x, y );
}

foo( { x: 1, y: 2 } );				// 2 1
foo( { y: 42 } );					// undefined 42
foo( {} );							// undefined undefined