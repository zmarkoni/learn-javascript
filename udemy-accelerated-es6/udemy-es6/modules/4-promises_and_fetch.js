// Set up promise, some request to the server  http://jsonplaceholder.typicode.com/
// https://www.youtube.com/watch?v=s6SH72uAn3Q

// let promise = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         resolve('Done!'); // data from server
//         //reject('Error happen!');
//     }, 1500);
// });
//
// promise.then( // execute promise, with VALUE received from promise
//     function (value) { // handle received data from resolve
//         console.log(value);
//     },
//     function (error) { // handle reject
//         console.log(error);
//     },
// );

// Chaining promises

// function waitAsecond(seconds) {
//     return new Promise(function (resolve, reject) {
//         if (seconds > 2) {
//             reject('Rejected');
//         }
//         else {
//             setTimeout(function () {
//                 seconds++;
//                 resolve(seconds);
//             }, 1000);
//         }
//
//     });
// }
//
// waitAsecond(3)
//     .then(waitAsecond) // value is automatically passed
//     .then(function (value) {  // wait for first THAN to finish and than execute
//         console.log(value)
//     })
//     .catch(function (error) { // catch reject
//         console.log(error);
//     });

// All and Race

// let promise1 = new Promise(function(resolve, reject) {
//   setTimeout(function() {
//     resolve('promise1 Done!');
//     //reject('promise1 Rejected!');
//   }, 1000);
// });
//
// let promise2 = new Promise(function(resolve, reject) {
//   setTimeout(function() {
//     //resolve('promise2 Done!');
//     reject('promise2 Rejected!');
//   }, 2000);
// });


//Promise.all wait for All promises to be resolved, and than get executed,
//execute all off them if they are successful, or
// execute reject only for one which is not successful
// Promise.all([promise1, promise2]) // ALL expect array of promises which we want
//   .then(function(success) {
//     console.log(success)
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

//Promise.race just look for quickest promise which is resolved and than execute
// Promise.race([promise1, promise2]) // race expect array of promises which we want
//   .then(function(success) {
//     console.log(success)
//   })
//   .catch(function(error) {
//     console.log(error);
//   });


// var jsonPromise = new Promise(function(resolve, reject) {
//   // JSON.parse throws an error if you feed it some invalid JSON, so this implicitly rejects:
//   resolve(JSON.parse("This ain't JSON"));
// });

// jsonPromise.then(function(data) {
//   // This never happens:
//   console.log("It worked!", data);
// }).catch(function(err) {
//   // Instead, this happens:
//   console.log("It failed!", err);
// })


//================================================================================
//=========== setTimeout ==============================================================
//================================================================================

// setTimeout(() => saySomething("Hey Zoki"), 1000);

function saySomething(val) {
  console.log('saySomething: ' + val);
}

function failureCallback() {
  console.log('failureCallback');
}

// Evo kako mozemo zameniti setTimeout sa Promisom
/*
Mixing old-style callbacks and promises is problematic. If saySomething fails
or contains a programming error, nothing catches it.

Luckily we can wrap it in a promise. Best practice is to wrap problematic functions
at the lowest possible level, and then never call them directly again:
*/
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// ms = 2000
wait(2000).then(() => saySomething("setTimeout with promise")).catch(failureCallback);

//================================================================================
//=========== FETCH ==============================================================
//================================================================================

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// fetch already return PROMISE

// fetch('https://jsonplaceholder.typicode.com/posts/1')
//   .then(response => response.json())
//   .then(json => console.log(json))

// same like above!!!

// function getData(url) {
//     return fetch(url)
//         .then(response => response.json())
//         .then(json => console.log(json))
// }
//
// const url = 'https://jsonplaceholder.typicode.com/posts/1';
// getData(url);
