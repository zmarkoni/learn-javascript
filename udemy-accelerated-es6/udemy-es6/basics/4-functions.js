//====== old way =======

function oldFunc() {
    console.log('Hello');
}
//oldFunc();

let oldFn = () => {
    console.log('Hi');
}
//oldFn();

// if we have one line of code
let oldFn1 = () => console.log('Hi 1');
//oldFn1();

function oldFn2() {
    return 'Hi 2';
}
//console.log(oldFn2());

// if we have one line of code
let oldFn3 = () => 'Hi 3'; // return
//console.log(oldFn3());

// if we have more than one line of code
let oldFn4 = (a, b) => {
  return a + b
}
//console.log(oldFn4(3, 8)); // 11

// SPECIAL CASE, if we have one argument we can leave parentheses
let oldFn5 = a => a + 5;
//console.log(oldFn5(1)); // 6
//setTimeout(() => console.log('Hello'), 1000);

//======= (Fat) Arrow Functions and the "this” Keyword =======

function fn() {
    console.log(this);
}
//fn(); // window object

let fn2 = () => console.log(this);
//fn2(); // window object

// === with button ====
let button = document.querySelector('button');

function fn3() {
    console.log(this);
}
//'this' always reference to the left side of whatever call the function, check JS/this
button.addEventListener('click', fn3); // object HTMLButtonElement // <button>button</button>

// no need of bind, apply, call
let fn4 = () => console.log(this);

//this is treated differently with arrow functions, THIS keep it's context within function!!!
button.addEventListener('click', fn4); // window obj in this case

//======= Functions and Default Parameters =======
function isEqualTo(number, compare = 10) {  // compare parameter - have default value
  return number == compare;
}
//console.log(isEqualTo(10)); // true

// arrow funkcija, i gore radi isto sa starom
var isEqualTo1 = (number, compare = 10) => number == compare;
//console.log(isEqualTo1(10)); // true

let a = 100;
var isEqualTo1 = (number, compare = a) => {
  console.log(number);  // 10
  console.log(compare); // 100
  return number == compare;
}

//console.log(isEqualTo1(10)); // false