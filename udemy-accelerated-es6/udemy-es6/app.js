// When importing we don't need .js at the end of the path, we need it here only
// because of system.js
// We always importing references!!!

/*========================================================
================== importing =============================
=============  3 possible imports =======================*/

// import {testVariable, testFunc} from './modules/external.js';
// console.log(testVariable);
// testFunc();
//
// // import default, no need brackets, can be different name
// import Ab from './modules/external.js'
// console.log(Ab);
//
// // also we can use aliases
// import {exportFromTest as testMe} from './modules/testExport.js'
// console.log(testMe);

/*========================================================
================== classes  ==============================
==========================================================*/

// import {Person, BetterPerson, Helper, Car, ConvertableArray} from 'myClasses.js';

// let p = new Person('zoki');
//p.greet();

// let z = new BetterPerson(27);
//z.greet();
//z.greetNew();

//console.log(p.__proto__ === Person.prototype); //true
//console.log(p.prototype === Person.prototype); //false

//console.log(z.__proto__ === Person.prototype); //false
//console.log(z.__proto__ === BetterPerson.prototype); //true
// Which means that z have prototype of Zoki and Zoki have prototype of Person!!!

// Without STATICT we will need
// let test = new Helper();
// test.print('cao');

// With STATIC
//Helper.print('Caos');

// let car = new Car();
// car.name = 'Mercedes';
//console.log(car);
//console.log(car.name);

// let numberArray = new ConvertableArray();
// numberArray.push(1);
// numberArray.push(2);
// numberArray.push(3);
//console.log(numberArray.convert());


/*========================================================
==================iterators and generators=======================
==========================================================*/
//import * as ig from 'iterators_generators.js';
//console.log(ig);

/*========================================================
================== promises ==============================
==========================================================*/
//import * as pr from 'promises.js';

/*========================================================
==================maps and sets=======================
==========================================================*/

//import * as ms from 'maps_and_sets.js';



