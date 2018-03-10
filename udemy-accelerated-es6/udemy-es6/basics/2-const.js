// We should write const with upper letters
const AGE = 30; // const value can't change

//AGE = 20; // error Assignment to constant variable

console.log(AGE);


// CONST with array or objects behave differently - Important
// Because in this case CONST is just a pointer to array or object, and we can change it's value

const AGES = [20, 22, 25];  // const only holds a pointer to space in memory to this array and it is Object
console.log(AGES); // [20, 22, 25]

AGES.push(30);
console.log(AGES); // [20, 22, 25, 30]


// change value where pointer points only
let myAges = AGES;  // it is object
console.log(myAges); // [20, 22, 25, 30]


//Object
//Const can change values for Object properties because it is referenced type
// Pointer is not changed, only the value
const OBJ = {
  age:27,
  name: "Zoki"
}

console.log(OBJ);

OBJ.age = 35;
console.log(OBJ);