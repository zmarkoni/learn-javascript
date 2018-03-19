// Iterators

let array = [1,2,3];
//console.log(array[Symbol.iterator]); // function

let it = array[Symbol.iterator]();
// console.log(it); // Array Iterator
console.log(it.next());  //object {value: 1, done: false}
console.log(it.next());  //object {value: 2, done: false}
console.log(it.next());  //object {value: 3, done: false}
console.log(it.next());  //object {value: undefined, done: true}

// == we can override Iterator, here is how it looks like

// array[Symbol.iterator] = function() {
//   return {
//     next: function() {
//       return {
//         done: false,
//         value: undefined
//       };
//     }
//   };
// }

// == override
// array[Symbol.iterator] = function() {
//   let nextValue = 10;
//   return {
//     next: function() {
//       nextValue++;
//       return {
//         done: nextValue > 15 ? true : false,
//         value: nextValue
//       };
//     }
//   };
// }

// for (let element of array) {
//   console.log(element);
// }

// == Creating custom Iterable Object
// let person = {
//   name: 'Zoki',
//   hobbies: ['sports', 'cooking'],
//   [Symbol.iterator]: function() {
//     let i = 0;
//     let myHobbies = this.hobbies;
//     return {
//       next: function() {
//         let value = myHobbies[i];
//         i++;
//         return {
//           done: i > myHobbies.length ? true : false,
//           value: value
//         };
//       }
//     };
//   }
// };

// for(hobby of person) {
//   console.log(hobby);
// }

// == GENERATORS ===================================================
// == Generator always return iterator
// function *select() { // we need star here
//   yield 'House', // and we need YIELD(plod, prinos) keyword, works like Return
//   yield 'Garage'
// }

//select(); // return nothing here
//let it = select();
// console.log(it.next()); //object {value: 'House', done: false}
// console.log(it.next()); //object {value: 'Garage', done: false}
// console.log(it.next()); //object {value: undefined, done: true}


// let obj = {
//   [Symbol.iterator]: gen
// };
//
// function *gen() {
//   yield 10;
//   yield 20;
// }
//
// for (element of obj) {
//   //console.log(element);  // 10, 20
// }

// == Create dynamic generator by passing argument to it

// function *generator(end) {
//   for(let i = 0; i <  end; i++) {
//     try {
//       yield i;
//     } catch(e) {
//       console.log(e);
//     }
//   }
// }
//
// let iter = generator(2);
//console.log(iter.next()); //0

// == Generators have throw() method, which we can handle with try/catch
// == and return() which is not supported

// console.log(iter.next()); //1
// console.log(iter.throw('My error ocurred!'));
// console.log(iter.return(10)); // overiding value
// console.log(iter.next()); //undefined

// == http://chrisbuttery.com/articles/synchronous-asynchronous-javascript-with-es6-generators/
// function *generator1() {
//   yield 'hi';
//   yield 'Mr.';
//   yield 'Zoran';
//   return 'We rich the end!'
// }
//
// let iterator1 = generator1();
//console.log(iterator1.next());
// console.log(iterator1.next());
// console.log(iterator1.next());
// console.log(iterator1.next());

// == generator function
// function *generator2() {
//   let name = yield 'Barry';
//   return name + ', says hello';
// }

// == Iterator object
// let iterator2 = generator2();
// console.log(iterator2.next()); // { value: "Barry",  done: false }
// console.log(iterator2.next('Sue')); // { value: "Sue, says hello", done: true }


// == First I’m going to create a generator function called getTweets().
// == This function is going to yield 3 different XHR requests and
// == jam the responses (tweets) into an array.

// == Thunk
// let get = function (url) {
//   // return a function, passing in our callback
//   return function (callback) {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.onreadystatechange = function() {
//       let response = xhr.responseText;
//       if(xhr.readyState != 4) return;
//       if (xhr.status === 200) {
//         callback(null, response);
//       }
//       else {
//         callback(response, null);
//       }
//     };
//     xhr.send();
//   };
// };

// let getTweets = function* () {
//   let totalTweets = [];
//   let data;
//
//   // pause. On `iterator.next()` get the 1st tweet and carry on.
//   data = yield get('https://api.myjson.com/bins/2qjdn');
//   totalTweets.push(data);
//
//   // pause. On `iterator.next()` get the 2nd tweet and carry on.
//   data = yield get('https://api.myjson.com/bins/3zjqz');
//   totalTweets.push(data);
//
//   // pause. On `iterator.next()` get the 3rd tweet and carry on.
//   data = yield get('https://api.myjson.com/bins/29e3f');
//   totalTweets.push(data);
//
//   // log the tweets
//   console.log(totalTweets);
// };


