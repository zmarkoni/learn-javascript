age = 27;
console.log(age);

var age; // this will work

//=====
//LET need to be declared at the beginning, no hoisting like with VAR

//name = "zoran";  // ReferenceError: name is not defined
//console.log(age);

let name;

// using with function
function doSmth() {
    age1 = 27;
    console.log(age1);
}

let age1; // it is declared before it is used by the function
doSmth();
