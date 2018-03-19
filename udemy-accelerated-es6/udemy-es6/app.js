// When importing we don't need .js at the end of the path, we need it here only
// because of system.js
// We always importing references!!!

/*========================================================
================== importing =============================
=============  3 possible imports =======================*/

// == Modules are always in Strict Mode (no need to define "use strict")
// == Modules don't have a shared, global Scope. Instead each Module has its own Scope

// import { testVariable, testFunc } from './modules/1-external.js';
// console.log(testVariable);
// testFunc();

// == import default, no need brackets, can be different name
// import AB from './modules/1-external.js'
// console.log(AB);

// == also we can use aliases
// import { exportFromTest as testMe } from './modules/1-testExport.js'
// console.log(testMe);

/*========================================================
================== classes  ==============================
==========================================================*/

//import { Person, BetterPerson, Helper, Car, ConvertableArray } from './modules/2-myClasses.js';

// let p = new Person('zorane');
// p.greet();

// let z = new BetterPerson('Zoran', 27);
// z.greet();
// z.greetNew();

//console.log(p.__proto__ === Person.prototype); //true
//console.log(p.prototype === Person.prototype); //false

//console.log(z.__proto__ === Person.prototype); //false
//console.log(z.__proto__ === BetterPerson.prototype); //true
// Which means that z have prototype of Zoki and Zoki have prototype of Person!!!

// Without STATIC we will need
// let test = new Helper();
// test.print('cao');

// With STATIC
//Helper.print('Caos');

// let car = new Car();
// car.name = 'Me';
// console.log(car);
// console.log(car.name);

// let numberArray = new ConvertableArray();
// numberArray.push(1);
// numberArray.push(2);
// numberArray.push(3);
//console.log(numberArray.convert());


/*========================================================
==================iterators and generators=======================
==========================================================*/
//import * as ig from './modules/3-iterators_generators.js';

/*========================================================
================== promises ==============================
==========================================================*/
import * as promises from './modules/4-promises_and_fetch.js';

/*========================================================
==================maps and sets=======================
==========================================================*/

//import * as ms from './modules/5-maps_and_sets.js';



