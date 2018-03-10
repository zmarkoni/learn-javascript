'strict';
let obj = {
    name: 'Zoki',
    age: 27,
    greet: function () {
        console.log('Hello ' + this.name);
    },
    greet1: () => console.log('Hello ' + this.name)
};

let {name, age, greet} = obj; // variable names has to match with obj properties names
console.log(name, age);

greet(); // "Hello"  , should be "Hello Max"
//obj.greet(); // "Hello Max"

// we can use aliases
let {greet: hello} = obj;
hello();