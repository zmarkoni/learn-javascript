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
//console.log( singletonTest.pointX );