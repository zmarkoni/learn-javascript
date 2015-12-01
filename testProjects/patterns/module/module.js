
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