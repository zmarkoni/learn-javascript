


// maps is collection which store data as key/value pairs
// sotore Object in a map and assign KEY to it so we can indetify it

let cardAce = {
  name: 'Ace of Spades'
};

let cardKing = {
  name: 'King of Clubs'
};

let deck = new Map();
deck.set('as', cardAce);
deck.set('kc', cardKing);

// console.log(deck);
// console.log(deck.size);

//get keys
// console.log(deck.keys()); // check keys, return iterator
// for (let key of deck.keys()) {
//   console.log(key); // print keys
// }

//get values
// console.log(deck.values()); // check values, return iterator
// for (let val of deck.values()) {
//   console.log(val); // print keys
// }

//get keys and entries
// console.log(deck); // check map, return iterator
// for (let entry of deck) {
//   console.log(entry); // print keys/values as array
// }

// get object
//console.log(deck.get('as')); // pas key

// get values
//console.log(deck.get('as').name);

// delete
//deck.delete('as'); //delete single key
//deck.clear(); // delete all keys

// WeakMap for Objects only, it is maintained by garbage collector
// budalastina
// let key1 = {};
// let key2 = {}

// let myWeakMap = new WeakMap();
// myWeakMap.set(key1, cardAce);
// myWeakMap.set(key2, cardKing);

// console.log(myWeakMap.get(key1));
