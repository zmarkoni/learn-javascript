class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log('Hello ' + this.name);
  }
}

//let p = new Person('zoki');
//p.greet();

//Inheritance with EXTENDS
class BetterPerson extends Person {
  // here we can overide or extend everything from Person
  // If I want to set up contructor here also, I need to call
  // parent constructor with super()
  constructor(age) {
    super('zzz'); // we always need SUPER
    this.age = age;
  }

  greet() {
    console.log('I have ' + this.age + ' years');
  }

  greetNew() {
    super.greet(); // call parent greet()
    this.greet(); // call current greet()
  }
}

//using STATIC keyword to allow calling the method directly
class Helper {
  static print(message){
    console.log('my message is: ' + message);
  }
}

class Car {
  constructor() {
    this._name = name;
  }

  set name(value) {
    if (value.length > 2) {
      this._name = value;
    }
    else {
      console.log('name nee to be more than ' + value + ' long');
    }
  }

  get name() {
    return this._name;
  }
}

//extending objects

class ConvertableArray extends Array {
  convert() {
    let returnArray = [];
    this.forEach(value => returnArray.push('Converted!' + value));
    return returnArray;
  }
}

export {Person, BetterPerson, Helper, Car, ConvertableArray}

// find object

let inventory = [
  {name: 'apples', quantity:2},
  {name: 'bannas', quantity:0},
  {name: 'cherries', quantity:5}
];

function findCherries(obj) {
  return obj.name === 'cherries';
}

//console.log(inventory.find(findCherries));



