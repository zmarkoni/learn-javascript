/*
    working with THIS
*/


// Useful in listener.js when we need to call object.method and pass object(this), event.currentTarget is click event
//     $('body').on('click', '.js_button', function(event) {
//         new Manager().updateQty(event);  //it's pass new Manager() object (this) to method updateQty automaticly
//         //console.log(event); // MouseEventß
//     });

/*
jQuery Proxy 

There are times when it is necessary for us to control the access and context behind an object and this is where the
Proxy pattern can be useful.

In jQuery core, a jQuery.proxy() method exists which accepts as input a function and returns a new one which will
always have a specific context. This ensures that the value of this within a function is the value we expect.

Proxy is used when we need to call some function and pass 'this' in that function

An example of where this is useful is when we're making use of timers within a click event handler.
Imagine we have the following handler prior to adding any timers:
*/

    // $("body").on("click", "button", function(){
    //     setTimeout( $.proxy( function(){
    //         $(this).css("background","blue");
    //     }, this), 500); //pass this value
    // });


/* jQuery bind */

    //$("body").on("click", "button", this.someMethod.bind(this));

//or pure javascript function bind

//Below is an example of such function. It accepts a function func and returns a wrapper which calls func with this = fixThis.

    function bind(func, fixThis) {
        return function() {
            return func.apply(fixThis, arguments);
        }
    };
    
    var el = document.getElementById('placeholder');
    
    function doSomething(elem) {
        elem.onclick = bind( function(e) {
            //console.log(elem); // this = element
            console.log(e.currentTarget); // isto je this = element
        }, this);
    };
    
    doSomething(el);


// Late binding 
//
// Late binding is a variation of bind with slightly different behavior.
//
// In short, it means “binding on call time”, instead of “immediate binding”.

    function bindLate(funcName, fixThis) { // instead of bind
        return function() {
            return fixThis[funcName].apply(fixThis, arguments)
        }
    };

    function Menu(elem) {

        this.sayHi = function() { alert('Menu') }

        elem.onclick = bindLate('sayHi', this)
    };

    function SuperMenu(elem) {
        Menu.apply(this, arguments)

        this.sayHi = function() { alert('SuperMenu') }
    };

    new SuperMenu(document.body);

    console.log('zoki 123');



/*

Using var self = this

Works equally with event handlers, local functions etc. All we need is a closure to put var self = this.

*/

    // function Menu(elem) {
    //
    //     var self = this
    //
    //     setTimeout(function() {
    //         alert(self)  // object! (menu)
    //     }, 1000)
    //
    // };
    //
    // new Menu(document.createElement('div'));



/*
Call and Apply

http://hangar.runway7.net/javascript/difference-call-apply

Both call and apply perform very similar functions: they execute a function in the context (they change this), or scope,
of the first argument that you pass to them. Also, they're both functions that can only be called on other functions.
In call the subsequent arguments are passed in to the function as they are
apply expects the second argument to be an array that it unpacks as arguments for the called function.

Call() executes the function with a particular this value and with specific parameters. The first parameter of call()
is the value to which this should be equal when the function is executed. All subsequent parameters are the parameters
that should be passed into the function.


*/

    // function sayNameForAll(label) {
    //     var label = arguments.length !=0 ? label : '';
    //     console.log(label + ' Mr: ' + this.name);
    // };
    //
    // var name = "Michael"; //global
    //
    // var person1 = {
    //     name: "Nicholas"
    // };
    // var person2 = {
    //     name: "Greg"
    // };


    // sayNameForAll.call(this, 'Hi');		// outputs "My name is Michael"
    // sayNameForAll.call(person1, 'Hello');	// outputs "My name is Nicholas"
    // sayNameForAll.call(person2);	// outputs "My name is Greg"
    //
    // sayNameForAll.apply(this, ["Hey","Test"]);	// outputs "My name is:Michael"
    // sayNameForAll.apply(person1); // outputs "My name is:Nicholas"
    // sayNameForAll.apply(person2); // outputs "My name is:Greg"
