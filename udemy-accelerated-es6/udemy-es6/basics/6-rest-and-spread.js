//REST and SPREAD Operators

//====== REST ============
// Kada radimo sa POLJIMA sve je ok
let numbers = [1,2,3];

function sumUp(toAdd) {
  console.log(toAdd);
  let result = 0;
  for(let i=0; i< toAdd.length; i++) {
    result += toAdd[i];
  }
  return console.log(result);
}

sumUp(numbers); // 6

//ali kada imamo neku LISTU gde ne znamo koliko argumentata imamo onda smo u problemu
// So when we have some LIST of values

//REST parameter is actually 3 dots in front of argument! It will convert list of numbers to array of numbers

function sumUp1(...toAdd) { // REST parameter is actually 3 dots in front of argument
  console.log(toAdd);
  let result = 0;
  for(let i=0; i< toAdd.length; i++) {
    result += toAdd[i];
  }
  return console.log(result);
}

sumUp1(10,20,30); // 60

//====== SPREAD ============
//Spread is opposite of REST and it is used in Function call, to convert array to list of values

let newNumbers = [1,2,3];

console.log(...newNumbers);

console.log(Math.max(...newNumbers)); // 3

