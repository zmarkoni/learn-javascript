// Object literal
var Person = {
  name: "Zoran",
  age: 33,
  showPerson: function() {
    console.log("Person: " + this.name + " is " + this.age + " years old!");
  }
}
var newPerson = Person;
//newPerson.showPerson();

//constructor
function Person2(name, age) {
  this.name2 = name;
  this.age2 = age;
}

Person2.prototype.showPerson2 = function() {
  console.log("Person2: " + this.name2 + " is " + this.age2 + " years old!");
};

var p2 = new Person2("Jelena", 29);
//p2.showPerson2();
//############################################################
//inheritance
//############################################################
function Person3(lastName, name, age) {
  Person2.call(this, name, age); // inherit from Person2
  this.lastName = lastName;
  // this.name = name;
  // this.age = age;
}

Person3.prototype = Object.create(Person2.prototype, {
  constructor: {
    configurable: true,
    enumerable: true,
    value: Person3,
    writable: true
  }
});

Person3.prototype.showLastName = function() {
  console.log("Person last name is: " + this.lastName);
}

var p3 = new Person3("Markovic", "Slobodan", 55);
// p3.showPerson2();
// p3.showLastName();

//anonymus function
// (function() {
//   console.log("It works");
// })();
//############################################################
//method invocation pattern
//############################################################
var myObject = {
  value: 0,
  increment: function(inc) {
    //test
    var value = 10; // value nema uticaja na this.value
    //this.value je 0 zato sto je this vezan za objekat!!!
    return this.value += typeof inc === 'number' ? inc : 1;
  }
};
// myObject.increment(); //zovem metodu (funkciju)
// console.log(myObject.value); //rezultat je: 1
//
// myObject.increment(55);
// console.log(myObject.value); //rezultat je: 55

//############################################################
//function invocation pattern
//############################################################
myObject.double = function() {
  var that = this;
  var helper = function() {
    var result = myObject.increment(that.value, that.value);
    console.log("Double is: " + result);
  }
  helper();
};

// Invoke double as a method.
//myObject.double();
//#############################################################
//Test the scope
//###############################################################
function scopeTest(count) {
  for (var i = 0; i < count; i++) {
    console.log("count " + i);
  }
  // i = 10;
  console.log("final count is: " + i); //10
}
//scopeTest(3);

test2 = "global_zoran";
(function() {
  test2 = "private_zoran";

  function privateTest() {
    var test2 = "private_zoran123";
    console.log("form function privateScope: " + test2);
  }

  //privateTest();
  //console.log("privateScope: " + test2);
})();
//console.log("GlobalScope: " + test2);
//##########################################################################
//Ako funkcija i promenljiva imaju isto ime, onda funkcija overajduje ime promenljive
//##################################################################################

myName = "Zoran"; // ili var myName="Zoran"; isto overajduje
function myName() { // ne overajduje varijablu
  console.log("from function: " + myName);
}
//console.log(typeof myName);
//########################################
var myLastName;

function myLastName() { // overajduje varijablu
  console.log("from function: " + myLastName);
}
//console.log(typeof myLastName);
//########################################
var age = 33;
age = function() { // overajduje varijablu u svakom slucaju
    console.log("from function: " + age);
  }
  //console.log(typeof age);

//Variable hoisting
function myDog() {
  var name = "Tina";
  console.log(name + " says woof woof!");

}
///myDog();

//Function public scope

// (function(){
//   function countNumbers(count) {
//     for( var i=0; i<count; i++) {
//       console.log("count numbers: " + i);
//     }
//     var i = 10;
//     console.log("max count is: " + i); //10
//   }
//   countNumbers(2); //0,1
//   console.log("i outside the function: " + i); // i is not defined
// })();
//console.log("i outside the anonymus function: " + i); // i is not defined

//create privileged methods with constructor(this) - it is clouser
function myFuncton() {
  var name = "Zoran";

  function addName(value) {
    name = value;
  }

  //privileged method = clouser
  this.updateName = function(value) {
    return addName(value);
  }

  this.showName = function() {
    console.log(name);
  }
}
// var z = new myFuncton();
// z.updateName("Jelena");
// z.showName();


//create privileged methods with function expressions
var Person = (function() {

  var name = "";
  var lastName = "";
  var age = 0;
  function createPerson(name, lastName, age) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }

  function showPerson() {
    console.log("person: " + this.name + " " + this.lastName);
    return showAge(this.age);
  }

  function showAge(age){
    console.log("Age of preson:" + age);
  }

  return {
    createPerson: createPerson,
    showPerson: showPerson,
  };

})();

var z = Person;
z.createPerson("Zoran","Markovic", 32);
z.showPerson();
