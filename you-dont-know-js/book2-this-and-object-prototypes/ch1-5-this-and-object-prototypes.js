//https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md

function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope

    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}

function bar() {
    // call-stack is: `baz` -> `bar`
    // so, our call-site is in `baz`

    console.log( "bar" );
    foo(); // <-- call-site for `foo`
}

function foo() {
    // call-stack is: `baz` -> `bar` -> `foo`
    // so, our call-site is in `bar`

    console.log( "foo" );
}
//baz(); // <-- call-site for `baz`  'this' is window

function foo1() {
	console.log( this.a ); // this = obj, Because obj is the this for the foo() call, this.a is synonymous with obj.a.
}

var obj = {
	a: 2,       // typeof(obj.a) -> "number"
	fooObj: foo1 // typeof(obj.fooObj) -> "function"
};

//obj.fooObj(); // 2

///////////////
function foo2() {
	console.log( this.a );  // this = obj2
}

var obj2 = {
	a: 42,
	foo: foo2
};

var obj1 = {
	a: 2,
	obj2: obj2
};

//obj1.obj2.foo2(); // 42

/////////
function foo3() {
	console.log( this.a );
}

var obj = {
	a: 2
};

//foo3.call( obj ); // 2
//Invoking foo with explicit binding by foo.call(..) allows us to force its this to be obj.

//////
function foo4(something) {  // something = 3
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = function() {
	return foo4.apply( obj, arguments );  // arguments = 3
};

// var b = bar( 3 ); // 2 3
// console.log(b);
///////
//Since hard binding is such a common pattern, it's provided with a built-in utility as of ES5: Function.prototype.bind, and it's used like this:

function foo5(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

//var bar = foo5.bind( obj );  // using BIND, no need to pass arguments like with apply!!!

//var b = bar( 3 ); // 2 3
//console.log( b ); // 5
//bind(..) returns a new function that is hard-coded to call the original function with the this context set as you specified.

//Note: As of ES6, the hard-bound function produced by bind(..)
// has a .name property that derives from the original target function.
// For example: bar = foo.bind(..) should have a bar.name value of "bound foo", which is the function call name that should show up in a stack trace.
//console.log( 'check binding for bar function: ' + bar.name );

///////////

function foo6(p1,p2) {
	this.val = p1 + p2;
}

// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo6.bind( null, "p1" );

var baz = new bar( "p2" );

//baz.val; // p1p2

// better approach is to use empty object

// Whatever you call it, the easiest way to set it up as
// totally empty is Object.create(null) (see Chapter 5).
// Object.create(null) is similar to { }, but without the delegation to Object.prototype,
// so it's "more empty" than just { }.

function foo7(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// our DMZ empty object
var emptyObj = Object.create( null );

// spreading out array as parameters
//foo7.apply( emptyObj, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo7.bind( emptyObj, 2 );
//bar( 3 ); // a:2, b:3
// Not only functionally "safer", there's a sort of stylistic benefit to ø, in that it semantically conveys "I want the this to be empty" a little more clearly than null might. ' +
// 'But again, name your DMZ object whatever you prefer.

////////////////////
// Lexical 'this' with arrow functions:

// Arrow-functions are signified not by the function keyword,
// but by the => so called "fat arrow" operator. Instead of using the four standard this rules,
// arrow-functions adopt the this binding from the enclosing (function or global) scope.

//Let's illustrate arrow-function lexical scope:

function fooa() {
	// return an arrow function
	return (a) => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	};
}

var obj1 = {
	a: 2
};

var obj2 = {
	a: 3
};

var bar = fooa.call( obj1 );
bar.call( obj2 ); // 2, not 3!

// The arrow-function created in foo() lexically captures whatever foo()s this is at its call-time.
// Since foo() was this-bound to obj1, bar (a reference to the returned arrow-function)
// will also be this-bound to obj1. The lexical binding of an arrow-function
// cannot be overridden (even with new!).
//
// The most common use-case will likely be in the use of callbacks,
// such as event handlers or timers:

function fooa1() {
	setTimeout(() => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	},100);
}

var obj = {
	a: 2
};

fooa1.call( obj ); // 2

/*
          RULES how this is found in scope
Determining the this binding for an executing function requires finding the direct call-site of that function. Once examined, four rules can be applied to the call-site, in this order of precedence:

1.Called with new? Use the newly constructed object.

2.Called with call or apply (or bind)? Use the specified object.

3.Called with a context object owning the call? Use that context object.

4.Default: undefined in strict mode, global object otherwise.

Be careful of accidental/unintentional invoking of the default binding rule.
In cases where you want to "safely" ignore a this binding,
a "DMZ" object like ø = Object.create(null) is a good placeholder value
that protects the global object from unintended side-effects.

5.Instead of the four standard binding rules, ES6 arrow-functions use lexical scoping for
this binding, which means they adopt the this binding (whatever it is) from its enclosing function call.
They are essentially a syntactic replacement of self = this in pre-ES6 coding.
 */