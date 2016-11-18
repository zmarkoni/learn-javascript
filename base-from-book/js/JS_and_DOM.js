"use strict"

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Prototype-based_programming

//============= Check if broweser support javascript=============
var feature = {
    addEventListener: window.addEventListener,
    querySelectorAll: document.querySelectorAll
};
console.log(feature.addEventListener);

//we detect if these features are supported by using this simple "if" statement below. If they aren’t supported,
//the browser won’t execute any of this code:

if (feature.addEventListener && feature.querySelectorAll) {
    //this.init();
}

//These two tests make sure that we have a native way of using CSS selectors in our JavaScript (querySelectorAll),
//a way to easily add and remove events (addEventListener) and also that the browser’s standards support is better than what IE8 has.

//$(document).ready(function(){});
document.addEventListener("DOMContentLoaded", function () {
    //code

}, false);

//============= Selectors API======================

// var element1 = document.guerySelector("div");
var element2 = document.querySelector(".some-class");
var element3 = document.querySelectorAll(".container div");
var element4 = document.getElementById("someID");

var nav = document.querySelector("nav");
// var links = nav.querySelectorAll("a");

//============= Understanding nodeType, nodeName and NodeValue ======

// element1.nodeType
// element1.nodeName
// element1.atributes



//============= Traversing the DOM nodes ========================
// access to html tag <html>
var htmlEl = document.documentElement.className;
var parent = document.querySelector("div").parentNode;

var child = document.querySelector("ul").children[0];

var allchildren = document.querySelector("ul").childNodes;

var nextEl = document.querySelector("div").nextSibling;

var prevEl = document.querySelector("div").previousSibling;

var lastEl = document.querySelector("div").lastElementChild;


//============= Adding and Removing Classes================
// Select an element
var element = document.querySelector(".some-class");

// Give(replace) current class with "foo" to the element
// element.className = "foo";

//Adding a class without replacing the current classes:
// element.className += " foo"; // obrati paznju na razmak

//removing only certain classes

// removeClass, takes two params: element and classname
function removeClass(el, cls) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    // el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g, "");
}

removeClass(element, "foo");

//If you also want to check an element against some class, kind of like jQuery’s hasClass works, you could add this in your utils:
// hasClass, takes two params: element and classname
function hasClass(el, cls) {
    // return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}
// Check if an element has class "foo"
if (hasClass(element, "foo")) {
    // Show an alert message if it does
    alert("Element has the class!");
}

//===========Introducing HTML5 classList API=================

//You can feature detect if the browser supports it by using this simple "if" statement:

if ("classList" in document.documentElement) {
    // classList is supported, now do something with it
}

//Adding, removing and toggling classes with classList:
// Adding a class
// element.classList.add("bar");

// Removing a class
// element.classList.remove("foo");

// Checking if has a class
// element.classList.contains("foo");

// Toggle a class
// element.classList.toggle("active");

var element = document.querySelector("#test");
// element.classList.add("two");
// element.classList.remove("four");

//============Manipulating the DOM ===================
//Below, we have an example that selects an element from the DOM, clones it, manipulates the clone’s styles with
//JavaScript and then replaces the original element with the manipulated one.

// Select an element
var element = document.querySelector(".class");

// Clone it
// var clone = element.cloneNode(true);
//
// // Do some manipulation off the DOM
// clone.style.background = "#000";
//
// // Replaces the original element with the new cloned one
//element.parentNode.replaceChild(clone, element);

//If you don’t want to replace anything in the DOM, but instead append the newly created div inside the <body>,
//you could do it like this:

//document.body.appendChild(clone);

//======================Determining Max-Width of Responsive Images in JS==================
//var maxWidth = img.naturalWidth;

//for older browsers we need to get data from image by loading the image into an in-memory object
//But first we need to check if image is loaded like this

function imgHasDimensions(img) {
    return !!((img.complete && typeof img.naturalWidth != undefined) || img.width );
}

function imgGetMaxWidth(img) {
    var maxWidth;

    if(imgHasDimensions(img)){
        maxWidth=img.naturalWidth;
    }else{
        var image = new Image();
        image.src = img.src;
        maxWidth = image.width;
    }

    return maxWidth;

}

//============Determining if an Element is in the Viewport==================

// Determine if an element is in the visible viewport
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    );
}
//The above function could be used by adding a “scroll” event listener to the window and then calling isInViewport().

/*
Working with properties from within the class is done by the keyword >> this <<<, which refers to the current object.
(Inside the class the syntax this.Property is used to get or set the property's value.)

Accessing (reading or writing) a property outside of the class is done with the syntax: >>> InstanceName.Property <<<
*/

/* Clean this code down >>>>>>>>>>>>>>>>>>>  */


//Inheritance
function Person(name, gender) {
    this.name = name;
    this.gender = gender;
}


var person1 = new Person('Zoran','male');
var person2 = new Person('Bojan', 'male');

//In the example below we define and use the method sayHello() for the Person class.
Person.prototype.Hello = function () {
    alert(this.name + ' is a ' + this.gender); // person1 is a Male);
}

//call a method
//person2.Hello();

//In JavaScript methods are regular function objects that are bound to a class/object as a property which means they can be invoked "out of the context". Consider the following example code:



function Persons() { }

Persons.prototype.walk = function () {
    alert('I am walking!');
};
Persons.prototype.sayHello = function () {
    alert('hello');
};

// define the Student class
function Student() {
    // Call the parent constructor
    Persons.call(this);
}

// inherit Person
Student.prototype = new Persons();

Student.prototype.constructor = Student;

Student.prototype.sayHello = function () {
    alert('hi, I am a student');
};
Student.prototype.sayGoodBye = function () {
    alert('goodBye');
}

var zoki = new Student();
/*
zoki.walk();
zoki.sayHello();
zoki.sayGoodBye();


alert(zoki instanceof Persons); // true
alert(zoki instanceof Student); // true
*/

//Abstraction
var foo = function () { };

//alert('foo is a Function: ' + (foo instanceof Function));
//if (foo instanceof Function) { alert('zoki') }
//alert('foo.prototype is an Object: ' + (foo.prototype instanceof Object));

//Print out Javascript objects

var sampleObject = { x:1, y:2, z:3  };

//1. for in
// for (property in sampleObject) {
//   alertText += property + ':' + sampleObject[property]+'; ';
// }
//alert(alertText);

//2. JSON.stringify
var myObject = JSON.stringify(sampleObject); // umesto for (property in sampleObject) {...}
//alert(myObject); //this will output {"x":1, "y":2, "z":3}

//3. In console
//or console.log(sampleObject);

// Javascript does not have block scope. (block scope like for, while petlje)
// Javascript have functions scope, Nested functions can view variables declared in their outer functions
/*
Basically, the difference between function scope and block scope is that in a language that uses function scope, any variables declared within a function are visible anywhere within that same function. But with block scope, the visibility of variables is confined to any given block (whether it's an if statement, where/for loop, etc) enclosed by curly braces.
*/

//Hoisting in Javascript
//http://www.programmerinterview.com/index.php/javascript/javascript-hoisting/

//The goal of minification is to improve performance
//The goal of obfuscation is to try to hide your original source code from other people

//What is the meaning of “falsy” in Javascript?
/*
As you probably already know, Javascript has the Boolean values true and false. But, what’s interesting and important is that you understand the fact that everything in Javascript has a built-in Boolean value in addition to it’s ‘obvious’ value, and that Boolean value is known as either falsy or truthy. This may sound confusing, but read on and the concept should become clearer.

Here’s a complete list of falsy values in Javascript:

false (the boolean false is also considered falsy)
"" (an empty string)
0 (zero)
null
undefined
NaN (a property that represents the "Not-a-Number" value -
indicating that a value is not a legal number)
*/

//Does Javascript support nested functions? How do they work?

//Wrapper object
/*
Well, what’s actually happening is that a wrapper object is being created. What is a wrapper object? Well, as soon as we make the call to charAt – in effect, what looks like a method access of a String object named strng – then Javascript will actually convert the string value to an object. You can think of it as Javascript making a call to new String(strng) behind the scenes.

The wrapper object will inherit all of the string methods, like charAt. And as soon as the property – in this case the charAt method – is correctly used, then the object that has just been created is thrown away. So, another word for the wrapper object is a “transient object”, because transient means something that appears just temporarily and then disappears.

Wrapper objects also apply to both numbers and booleans in Javascript, so that methods can be called on those types as well. Remember that the whole point of a wrapper object is to allow methods to be called on non-objects.


*/

// global variable​
var allUserData = [];
var generalLastName = "Clinton";

//console.log(generalLastName);

function logStuff (userData) {
    if ( typeof userData === "string")
    {
        console.log(userData);
    }
    else if ( typeof userData === "object")
    {
        for (var item in userData) {
            console.log(item + ": " + userData[item]);
        }
    }
}

function getInput(options,callback){ //callback = logStuff
    allUserData.push(options);

    if(typeof callback === "function"){
        callback(options);
    }
}


//getInput ({name:"Rich", speciality:"JavaScript"}, logStuff);

var clientData = {
    id:094545,
    fullName:"Not Set",
    setUserName:function(firstName, lastName) {
        this.fullName = firstName + lastName;
    }
}

function getUserInput(firstName, lastName, callback, callbackObj) {
    callback.apply(callbackObj,[firstName, lastName]);
}

getUserInput ("Barack", "Obama", clientData.setUserName, clientData);
//console.log (clientData.fullName);// Not Set​
//console.log (window.fullName); // Barack Obama






