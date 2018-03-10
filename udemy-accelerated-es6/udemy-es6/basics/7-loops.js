//LOOPS (for IN, for OF)

//for, while, do while,

//==== for in (loop throw properties in OBJECT) ====

let obj = {
    name: "Zoki",
    age: 35,
    greet() {
        console.log('Hi ' + this.name);
    }
}

for (let prop in obj) {
    console.log(prop); // return property names: "name", "age", "greet"
    console.log(obj[prop]); // return property values
}


//==== for of (looping throw ARRAYS) =========

let numbers = [1, 2, 3];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]); //1,2,3
}

//with FOR OF - we can us like this
for (let el of numbers) {
    console.log(el); //1,2,3
}