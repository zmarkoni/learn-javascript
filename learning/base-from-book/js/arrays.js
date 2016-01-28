//http://www.hunlock.com/blogs/Mastering_Javascript_Arrays
var array = [0, 1, 2, 3, 4, 5];

for (var i = 0; i < array.length; i++) {
  //  console.log(array[i]);
}
//console.log(array.length);

var array1 = [3, 'hello!', function() {
  return 5
}, {
  'color': 'blue',
  'budget': 25
}, /[ell]/i];

for (var i = 0; i < array1.length; i++) {
  // console.log(array1[i]);
}
// console.log("----------------------------");
// console.log(array1[3].color);

var array2 = [array];
// console.log(array2[0][3]);

var array3 = ['zero', 'one', 'two', 'three', 'four', 'five'];

function passedByReference(someArray) {
  someArray[1] = "changed";
}

var array4 = array3.slice();

passedByReference(array4);
// console.log(array4[1]);
// console.log(array3[1]);

var myArray = [1, 2, 3];
var newArray = [4, 5, 6];
var seven = 7;
var eight = 'eight';
var nine = {
  'sky': 'blue',
  'grass': 'green'
};
var joinedArray = myArray.concat(newArray, seven, eight, nine);
//
// console.log(myArray);     // outputs: 1,2,3
// console.log(joinedArray); // outputs: 1,2,3,4,5,6,7,'eight',[object Object]
// console.log(joinedArray[8].sky);
//
var myArray1 = [1, 'two', 3, 'four', 5, 'six', 7, 'eight', 9, 'ten', 10, 'six'];

function findIndex(arrayy,element) {
  var foundedIndex = [];
  var index = arrayy.indexOf(element);
  while (index != -1) {
    foundedIndex.push(index);
    index = arrayy.indexOf(element, ++index);
  }
  console.log(foundedIndex);
}
//findIndex(myArray1, 'six');

var myArray=[1,2,3,4,5,6,7,8,9,10];
var theData = myArray.join('~');     // theData=1~2~3~4~5~6~7~8~9~10
theData=encodeURIComponent(theData);
console.log(theData.split('~'));
