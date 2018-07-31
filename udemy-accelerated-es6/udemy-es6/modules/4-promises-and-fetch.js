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
//     function` (value) { // handle received data from resolve
//         console.log(value);
//     },
//     function (error) { // handle reject
//         console.log(error);
//     }
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

// function saySomething(val) {
//   console.log('saySomething: ' + val);
// }
//
// function failureCallback() {
//   console.log('failureCallback');
// }

// Evo kako mozemo zameniti setTimeout sa Promisom
/*
Mixing old-style callbacks and promises is problematic. If saySomething fails
or contains a programming error, nothing catches it.

Luckily we can wrap it in a promise. Best practice is to wrap problematic functions
at the lowest possible level, and then never call them directly again:
*/
//const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// ms = 2000
// wait(2000)
//     .then(() => saySomething("setTimeout with promise"))
//     .catch(failureCallback);

//===========
// function msgAfterTimeout(msg, who, timeout) {
//     return new Promise(function (resolve, reject) {
//       return setTimeout( () => resolve(`${msg} Hello ${who}!`), timeout)
//     })
// }
// msgAfterTimeout("", "Foo", 1000)
//     .then( msg => msgAfterTimeout(msg, "Bar", 2000))
//     .then( msg => { console.log(`done after 3000ms:${msg}`)});

//================================================================================
//=========== FETCH ==============================================================
//================================================================================

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developers.google.com/web/updates/2015/03/introduction-to-fetch
// fetch already return PROMISE

const resourceUrl = 'https://jsonplaceholder.typicode.com/posts/1';

function status(response) {
    if(response.status >=200 && response.status < 300) {
        return Promise.resolve(response)
    }
    else {
        return Promise.reject(new Error(response.status))
    }
}

function json(response) {
    return response.json()
}

fetch(resourceUrl)
    .then(status)
    .then(json)
    .then(result => console.log(result))
    .catch(error => console.log(error));

same like above!!!

function getData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(json => console.log(json))
}

getData(resourceUrl);

//using Ajax
function getDataFromServer(resourceUrl) {
    return new Promise((resolve, reject) => {
        // use jQuery Ajax
        $.ajax({
          url: resourceUrl,
          dataType: "json",
        }).done(resolve).fail(reject);
    });
};

getDataFromServer(resourceUrl).
    then(result => console.log(result.id));
