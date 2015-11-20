//JavaScript Design Patterns by Addy Osmani

//  3 Ways to create objects

var newObject1 = {};
var newObject2 = Object.create( Object.prototype );
var newObject3 = new Object();

//  There are 4 ways in which keys and values can then be assigned to an object:

//  1. dot syntax
newObject1.someKey = "Hello World 1";
    // get properties
    var value1 = newObject1.someKey;

//  2. Square bracket syntax
newObject2["someKey"] = "Hello World 2"
    // get properties
    var value2 = newObject2["someKey"];

//  3. defineProperty
Object.defineProperty( newObject3, "someKey", {
    value: "Hello World 3",
    writable: true,
    enumerable: true,
    configurable: true
});

//skraceno
var defineProp = function (obj, key, value) {
    var config = {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true
    };
    Object.defineProperty (obj, key, config);
};

//To use, we then create a new empty "person" object
var person = Object.create(Object.prototype);
//Populatetheobjectwithproperties
defineProp(person, "name", "Zoran");
defineProp(person, "car", "BMW");
//console.log(person);

//  4. Object.defineProperties

Object.defineProperties( newObject1, {

    "someKey": {
        value:"Hello World",
        writable:true
    },

    "anotherKey": {
        value: "foo bar",
        writable:false
    }

});

//As we will see a little later in the book,
//these methods can even be used for inheritance, as follows:

var driver = Object.create( person );
//console.log(driver.name);

defineProp(driver, "age", "27");
//console.log(driver.age);

Object.defineProperties( driver, {
    "job": {
        value:"Front End developer",
        writable:true
    },

    "merried": {
        value: "yes",
        writable:false
    }

});
//console.log(driver.job);
//console.log(driver.merried);

//  I CONSTRUCTOR PATTERN

//  Basic Constructor
function Car1( model, year, miles ) {
    this.model = model;
    this.year = year;
    this.miles = miles;

    this.carInfo1 = function () {
        return this.model + " has done " + this.miles + " miles!";
    };
}

//Usage:
//Create new instance of the car
var car1 = new Car1( "Megane", 2006, 1600000);
print( car1.carInfo1() );

// Constructors With Prototypes

function Car2( model, year, miles ) { //Isto
    this.model = model;
    this.year = year;
    this.miles = miles;
}

//Metod ide napolje u prototype
Car2.prototype.carInfo2 = function () {
    return this.model + " has done " + this.miles + " miles!";
};

var car2 = new Car2 ("BMW", 2010, 2000000);
print( car2.carInfo2() );

//  II THE MODULE PATTERN


















