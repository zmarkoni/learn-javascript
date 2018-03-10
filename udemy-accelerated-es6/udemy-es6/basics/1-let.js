//Let & Block Scope

let age = 30; //global scope

if(true) {
  let age = 20; // block scope , different variable
  console.log(age); //20
}

console.log(age); // 30
