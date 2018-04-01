// https://www.udemy.com/es6-bootcamp-next-generation-javascript/learn/v4/t/lecture/5332006?start=0

// ====== Object ======

let objOne = {
    a: 1
}

let objTwo = {
    b: 2
}

//================================================================================
//=========== Combine/Merge Object with Object.assign ============================
//================================================================================
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

let mergeObjects = Object.assign(objOne, objTwo);
//console.log(mergeObjects);


class Obj1 {
    constructor(val) {
        this.a = val;
    }
}

class Obj2 {
    constructor(val) {
        this.b = val;
    }
}

let obj1 = new Obj1(3);
let obj2 = new Obj2(4);

let obj = Object.assign(obj1, obj2); // obj will have instance of obj1
//console.log(obj);

// console.log(obj instanceof Obj1); //true
// console.log(obj instanceof Obj2); //false
//
// console.log(obj.__proto__ === Obj1.prototype); //true
// console.log(obj.__proto__ === Obj2.prototype); // false

// Merge in new object
let newObj = Object.assign({}, obj1, obj2); // obj will have instance of obj1
//console.log(newObj);
//console.log(newObj.__proto__ === Object.prototype); //true  which have prototpye of Object

//================================================================================
//=========== Object.setPrototypeOf ============================
//================================================================================
// Change prototype of Object after it is created

let person1 = {
    name: 'Zoran',
};

let person2 = {
    name: 'Jeka',
    lastName : 'Petrovic Markovic'
};

// console.log(person1.__proto__ === Object.prototype); // true
//
// Object.setPrototypeOf(person1, person2); // now person1 have proto of person2
//
// console.log(person1.__proto__ === Object.prototype); // false
// console.log(person1.__proto__ === person2); // true
//
// console.log(person1.name); // we will get Zoran, because prototype only works if we don't find property
// console.log(person1.lastName);  // Petrovic Markovic because of proto






//================================================================================
//=========== Math ============================
//================================================================================

// ===== Math.sign return sign of the number (positive, negative, 0, or NaN
let number1 = -21;
//console.log( Math.sign(number1)); // -1

let number2 = 21;
//console.log( Math.sign(number2)); // 1


// ===== Math.trunc cat everything after decimal
let number3 = 2.31;
//console.log( Math.trunc(number3)); // 2

// ===== Math.floor zaokruzuje broj na vecu decimalu ali samo za negativne brojeve

let number4 = -2.71;
//console.log( Math.floor(number4)); // -3

//================================================================================
//=========== Strings ============================
//================================================================================

//==== startsWith, endsWith, includes

let name = 'Zoran';
//console.log( name.startsWith('Zo')); // true
//console.log( name.endsWith('n')); // true

//================================================================================
//=========== Number ============================
//================================================================================

//==== isNaN, isFinite, isInteger

let myNumber = NaN;

//console.log( isNaN(myNumber)); // true
//console.log( Number.isNaN(myNumber)); // true, works same

//================================================================================
//=========== Array ============================
//================================================================================

//==== Array.of, Array.from, oldAray.fill, oldArray.find, oldArray.copyWithin

//myArray = Array.of(5,6,7); will create new array with this 3 elements,
// same like: myArray = [5, 6, 7];
let array = Array(5);
//console.log(array); // [undefined, undefined, undefined, undefined, undefined]

let array1 = Array.of(55, 22);  // create array with elements
//console.log(array1); // [55, 22]
let array2 = [54, 23];  // create array with elements - old way
//console.log(array2); // [54, 23]

//==== Create new array from some another array(extend it);
// let newArray = Array.from(myArray, val => val * 2);
let array3 = Array.from(array2, val => val * 2);
//console.log(array3);

//==== change array values with oldAray.fill
let array4 = [54, 23, 44];
array4.fill(100, 1, 2);
//console.log(array4); // [54, 100, 44]

//==== find something, return just first finding only
// so here we need to use FUNCTION,
// we can do calculations and then check if we can find something in myArray

//console.log(array4.find(val => (val >= 50))); // 54

let inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 10},
];

function findFruit(fruit) {
    return fruit.name === 'cherries';
}

//console.log(inventory.find(findFruit));  // {name: "cherries", quantity: 10}

// ==== oldArray.copyWithin(indexWhereToCopy, indexToCopy); override existing array

