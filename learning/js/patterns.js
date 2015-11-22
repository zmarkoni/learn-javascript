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

// ================ I CONSTRUCTOR PATTERNS  ====================================

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
//print( car1.carInfo1() );

// ===== Constructors With Prototypes ======================================

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
//print( car2.carInfo2() );

//  ===============  II THE MODULE PATTERN  ==============================

/*
In JavaScript, the Module pattern is used to further emulate the concept of
classes in such a way that we're able to include both public/private methods
and variables inside a single object, thus shielding particular parts from
the global scope. What this results in is a reduction in the likelihood of
our function names conflicting with other functions defined in additional
scripts on the page.
*/


//  Module defined using OBJECT LITERAL notation

var myModule = {

    myProperty: "someValue",

    //object literals can contain properties and methods.
    // e.g we can define a (further object) for module configuration
    myConfig: {
        useCaching: true,
        language: "en"
    },

    saySomething: function () {
        console.log("Where is Zoran Markovic?");
    },

    reportMyConfig: function () {
        console.log("useCaching is: " + this.myConfig.useCaching); //imam pristup myConfig
    },

    //Override current configuration
    updateMyConfig: function (newConfig) {
        if( typeof newConfig === "object") {
            this.myConfig = newConfig;  //imam pristup myConfig
            console.log(this.myConfig.language);
        }
    }
};

// myModule.saySomething();
// myModule.reportMyConfig();

// myModule.updateMyConfig({
//   language: "fr",
//   useCaching: false
// });

// myModule.reportMyConfig();

//  Module which is self-contained   ================================================

var testModule = (function () {

    var counter = 0;

    return {

        setCounter: function (value) {
            counter = value;
            console.log("Counter : " + counter);
        },

        incrementCounter: function () {
            return counter++;
        },

        resetCounter: function () {
              console.log("counter value prior to reset: " + counter);
              counter = 0;
        }
    };

})();

// testModule.setCounter(10);
// testModule.incrementCounter();
// testModule.resetCounter();

var basketModule = (function (){

    //private
    var basket = [];

    function doSomethingPrivate() {
        console.log("private function!");
    };

    function doSomethingPrivate() {

    };

    //return object expose to the public
    return {
        addItem: function(values) {
            basket.push(values);
        },

        getItemCount: function() {
            return basket.length;
        },

        //PUBLIC ALIAS TO PRIVATE FUNCTION (privatnu funkciju dodelimo public)
        doSomethingPublic: doSomethingPrivate,// NE RADI - NE RAZUMEM

        getTotal: function() {
            var itemNum = this.getItemCount(),
                result = 0;

                while(itemNum--) {
                    result+= basket[itemNum].price;
                }

                return result;
        }
    };

})();

//Inside the module, you may have noticed that we return an object .
//This gets automatically assigned to basketModule so that we can
//interact with it as follows:

// basketModule returns an object with public API
basketModule.addItem({
    item: "bread",
    price: 0.5
});

basketModule.addItem({
    item: "butter",
    price: 0.3
});

// console.log( basketModule.getItemCount() );
// console.log( basketModule.getTotal() );
// basketModule.doSomethingPublic();  // ne radi

// III REVEALING MODULE PATTERN    =========================================

/*
The result of his efforts was an updated pattern where we would simply define
all of our functions and variables in the private scope and return an anonymous
Object with pointers to the private functionality we wished to reveal as public.
*/

var myRevealingModule = (function() {
        var privateVar = "Zoran Markovic",
            publicVar = "Hey there!";

            function privateFunction() {
                console.log("Name: " + privateVar);
            }

            function publicSetName(val) {
                privateVar = val;
            }

            function publicGetName() {
                privateFunction();
            }

            // reveal public pointers to private functions and properties
            return {
                setName: publicSetName, //zovem kao metod
                greeting: publicVar,
                getName: publicGetName //zovem kao metod
            };

}) ();

console.log(myRevealingModule.greeting);
myRevealingModule.setName("Jeka");
myRevealingModule.getName();




