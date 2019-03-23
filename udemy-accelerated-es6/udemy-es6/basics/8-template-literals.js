//Template Literals

//Template Literals are STRINGS with extra features, using back-ticks ` `

let name = 'Zoki';

// We can write multiple strings
// We can use variable inside with ${variable}
// We can also escape it and print like it is written without assigning variable value
let description = `
  Hello, I'm ${name + ' !!!'}
  How are you today?

  Hello, I'm \${name + ' escaped!}  
`;

console.log(description);

// Interpolated Expressions

// Any valid expression is allowed to appear inside ${..} in an interpolated string literal,
// including function calls, inline function expression calls, and even other interpolated
// string literals!

function upper(s) {
	return s.toUpperCase();
}

var who = "reader";

var text =
`A very ${upper( "warm" )} welcome
to all of you ${upper( `${who}s` )}!`;

console.log( text );
// A very WARM welcome
// to all of you READERS!
// Here, the inner `${who}s` interpolated string literal was a little bit nicer convenience
// for us when combining the who variable with the "s" string, as opposed to who + "s".
// There will be cases that nesting interpolated string literals is helpful,
// but be wary if you find yourself doing that kind of thing often,
// or if you find yourself nesting several levels deep.

// If that's the case, the odds are good that your string value production could benefit
// from some abstractions.

// Expression Scope
// One quick note about the scope that is used to resolve variables in expressions.
// I mentioned earlier that an interpolated string literal is kind of like an IIFE, and it turns out thinking about it like that explains the scoping behavior as well.

function foo(str) {
	var name = "foo";
	console.log( str );
}

function bar() {
	var name = "bar";
	foo( `Hello from ${name}!` );
}

var name = "global";

bar();	// "Hello from bar!"

