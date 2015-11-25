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

// console.log(myRevealingModule.greeting);
// myRevealingModule.setName("Jeka");
// myRevealingModule.getName();

//  IV  SINGLETON PATTERN

//In JavaScript, Singletons serve as a shared resource namespace which isolate
//implementation code from the global namespace so as to provide a single point
//of access for functions.

var mySingleton = (function (){

    var instance;       // Instance stores a reference to the Singleton
    function init(){
        // Singleton

        //private
        function privateMethod() {
            console.log( "I am private" );
        }
        var privateVariable = "I am also private variable";

        var privateRandomNumber = Math.random;

        return {
            //public

            publicMethod: function() {
                console.log( "The public can see me!" );
            },
            publicProperty: "I am also public variable",

            getRandomNumber: function () {
                return privateRandomNumber;
            }
        };
    };

    return {    //Prvo ovde udje kad se pozove singleton, tj udje u getInstance() metod
        // Get the Singleton instance if one exists
        // or create one if it doesn't

        getInstance: function () {

            if( !instance ) { //ako nije definisana
                instance = init();
            }

            return instance;
        }
    };

})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();

//console.log( singleA.getRandomNumber() === singleB.getRandomNumber());

//In practice, the Singleton pattern is useful when exactly one object is
//needed to coordinate others across a system

var SingletonTester = (function (){
    //options: an object containing configuration options for
    // e.g var options = { name: "test", pointX: 5};

    function Singleton(options) { //konstruktor
        options = options || {};
        // set some properties for our singleton
        this.name = "SingletonTester123";
        this.pointX = options.pointX || 6;
        this.pointY = options.pointY || 10;
    }

    // our instance holder
    var instance;

    var _static = {
        // Method for getting an instance. It returns a singleton instance of a singleton object
        getInstance:function(options){
            if(instance === undefined){
                instance = new Singleton(options); //pozivam konstruktor odozgo
            }

            return instance;
        }
    };

    return _static;
})();

var singletonTest = SingletonTester.getInstance({
  pointX: 5
});
console.log( singletonTest.pointX );

//  IV  OBSERVER PATTERN

//One or more observers are interested in the state of a subject and register their interest with the subject by attaching themselves. When something changes in our subject that the observer may be interested in, a notify message is sent which calls the update method in each observer. When the observer is no longer interested in the subject's state, they can simply detach themselves.

//We can now expand on what we've learned to implement the Observer pattern with the following components:
    // 1. Subject: maintains a list of observers, facilitates adding or removing observers
    // 2. Observer: provides a update interface for objects that need to be notified of a Subject's changes of state
    // 3. ConcreteSubject: broadcasts notifications to observers on changes of state, stores the state of ConcreteObservers
    // 4. ConcreteObserver: stores a reference to the ConcreteSubject, implements an update interface for the Observer to ensure state is consistent with the Subject's

//First, let's model the list of dependent Observers a subject may have:

function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.add = function(obj){
    return this.observerList.push(obj);
};

ObserverList.prototype.count = function(){
    return this.observerList.length;
};

ObserverList.prototype.get = function(){
    if( index > -1 && index < this.observerList.length ){
        return this.observerList[index];
    }
};

ObserverList.prototype.indexOf = function(obj, startIndex){
    var i = startIndex;
    while( i < this.observerList.length ) {
        if(this.observerList[i] === obj) {
            return i;
        }
        i++;
    }
    return -1;
};

ObserverList.prototype.removeAt = function( index ){
    this.observerList.splice( index, 1 );
};

//Next, let's model the SUBJECT and the ability to add, remove or notify observers on the observer list.

function Subject(){
  this.observers = new ObserverList(); //NASLEDJUJE SVE METODE
}

Subject.prototype.addObserver = function( observer ){
  this.observers.add( observer );
};

Subject.prototype.removeObserver = function( observer ){
  this.observers.removeAt( this.observers.indexOf( observer, 0) );
};

Subject.prototype.notify = function( context ){
  var observerCount = this.observers.count();
  for(var i=0; i < observerCount; i++){
    this.observers.get(i).update( context );
  }
};

//We then define a skeleton for creating new Observers. The update functionality here will be overwritten later with custom behaviour.

// The OBSERVER
function Observer(){
  this.update = function(){
    // ...
  };
}

// In our sample application using the above Observer components, we now define:

// A button for adding new observable checkboxes to the page
// A control checkbox which will act as a subject, notifying other checkboxes they should be checked
// A container for the new checkboxes being added
// We then define ConcreteSubject and ConcreteObserver handlers for both adding new observers to the page and implementing the updating interface. See below for inline comments on what these components do in the context of our example.

