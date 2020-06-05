// https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch3.md#classes

class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log('Hello ' + this.name);
  }
}

// let p = new Person('zoki');
// p.greet();

// ==Inheritance with EXTENDS
class BetterPerson extends Person {
  // == here we can override or extend everything from Person
  // == If I want to set up constructor here also, I need to call
  // == parent constructor with super()
  constructor(name, age) {
    super(name); // we always need SUPER
    this.age = age;
  }

  greet() {
    console.log(this.name + ' have ' + this.age + ' years');
  }

  greetNew() {
    super.greet(); // call parent greet()
    this.greet(); // call current greet()
  }
}

// == using STATIC keyword to allow calling the method directly
class Helper {
  static print(message){
    console.log('my message is: ' + message);
  }
}

// == we can also EXPORT Class like Variable, Object or Function

class Car {
  constructor() {
    this._name = name;
  }

  set name(value) {
    if (value.length > 2) {
      this._name = value;  // underscore mean that this property is now PRIVATE ( encapsulation )
    }
    else {
      console.info('NAME need to be more than ' + value.length + ' characters long!');
    }
  }

  get name() {
    return this._name;
  }
}

// == extending objects,  need to use 'class' and 'extends'
// == Which built-in Objects may be extended ?
// == Have a look at the ES6 Compatibility Chart and
// == scroll down to "Subclassing": https://kangax.github.io/compat-table/es6/

class ConvertableArray extends Array {
  convert() {
    let returnArray = [];
    this.forEach(value => returnArray.push('Converted!' + value));
    return returnArray;
  }
}

export { Person, BetterPerson, Helper, Car, ConvertableArray }

// == find object

let inventory = [
  {name: 'apples', quantity:2},
  {name: 'bannas', quantity:0},
  {name: 'cherries', quantity:5}
];

function findCherries(obj) {
  return obj.name === 'cherries';
}

//console.log(inventory.find(findCherries));



