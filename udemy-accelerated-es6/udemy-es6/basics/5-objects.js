//Object Literal Extensions

// Concise Properties
// https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md#concise-properties
//If object properties don't have values, it can pick up from variables with same name, which is very bad!
// But only if they are declared before this object

let name = "Jeka";
let age = 33;

let obj = {
  name,
  age
}

console.log(obj);

// ==== result ====
// [object Object] {
//   age: 33,
//   name: "Jeka"
// }

//========= Dynamic fields and property name as String ===========

let lastNameField = "lastName"; // "lastName" is property name

let newObj = {
  "first name": "Zoki",  // property name as String
  age: 35,
  [lastNameField]: "Markovic",
  greetN: function() {
    console.log(this.lastName);
  },
  greetA() { // new sintax for functions
    console.log(this.age)
  },
}

newObj.greetN(); // Markovic
console.log(newObj.lastName); // Markovic
console.log(newObj[ lastNameField ] ); // Markovic
console.log(newObj["first name"]); //Zoran

// Concise Methods
// In a similar spirit to concise properties we just examined, functions attached to properties in object literals also have a concise form, for convenience.

// The old way:

var o = {
	x: function(){
		// ..
	},
	y: function(){
		// ..
	}
}

// And as of ES6:
var o1 = {
	x() {
		// ..
	},
	y() {
		// ..
	}
}
//Warning: While x() { .. } seems to just be shorthand for x: function(){ .. },
// concise methods have special behaviors that their older counterparts don't;
// specifically, the allowance for super (see "Object super" later in this chapter).