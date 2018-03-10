//Object Literal Extensions

//If object properties don't have values, it can pick up from variables with same name, which is very bad! But only if they are declared before this object

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

