// let promise = new Promise(function(resolve, reject) {
//   setTimeout(function() {
//     //resolve('Done!');
//     reject('Error happen!');
//   }, 1500);
// });

// promise.then(
//   function(value) { // handle resolve
//     console.log(value);
//   },
//   function(error) { // handle reject
//     console.log(error);
//   },
// );

// Chaining promises

// function waitAsecond(seconds) {
//   return new Promise(function(resolve, reject) {
//     if(seconds > 2) {
//       reject('Rejected');
//     }
//     else {
//       setTimeout(function() {
//         seconds++;
//         resolve(seconds);
//       }, 1000);
//     }

//   });
// }

// waitAsecond(3)
//   .then(waitAsecond)
//   .then(function(value) {
//     console.log(value)
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

// All and Race

let promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('promise1 Done!');
    //reject('promise1 Rejected!');
  }, 1000);
});

let promise2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    //resolve('promise2 Done!');
    reject('promise2 Rejected!');
  }, 2000);
});


//Promise.all wait for All promises to be resolved, and than get executed,
//execute all off them if successfull, or
// execute reject only for one which is not successful
// Promise.all([promise1, promise2]) // ALL expect array of promises which we want
//   .then(function(success) {
//     console.log(success)
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

//Promise.race just look for first promise which is resolved and than execute
// Promise.race([promise1, promise2]) // race expect array of promises which we want
//   .then(function(success) {
//     console.log(success)
//   })
//   .catch(function(error) {
//     console.log(error);
//   });


// var jsonPromise = new Promise(function(resolve, reject) {
//   // JSON.parse throws an error if you feed it some
//   // invalid JSON, so this implicitly rejects:
//   resolve(JSON.parse("This ain't JSON"));
// });

// jsonPromise.then(function(data) {
//   // This never happens:
//   console.log("It worked!", data);
// }).catch(function(err) {
//   // Instead, this happens:
//   console.log("It failed!", err);
// })


///////////////////
// setTimeout(() => saySomething("Hey Zoki"), 1000);

// function saySomething(val) {
//   console.log('saySomething: ' + val);
// }

// function failureCallback() {
//   console.log('failureCallback');
// }

// Evo kako mozemo zameniti TimeOut sa Promisom
/*
Mixing old-style callbacks and promises is problematic. If saySomething fails
or contains a programming error, nothing catches it.

Luckily we can wrap it in a promise. Best practice is to wrap problematic functions
at the lowest possible level, and then never call them directly again:
*/
// const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// wait(2000).then(() => saySomething("setTimeout with promise")).catch(failureCallback);



