(function(){
    // Array extras
    //higher-order function – a function that receives another function as an argument. Instead of looping over array elements

    //https://www.sitepoint.com/back-to-basics-array-extras/

    // var foo = ["a", "b", "c", "d"];
    // for (var i = 0, len = foo.length; i < len; i++) {
    //     print(foo[i]);
    // }





    // forEach()
    // Like many of the array extras, the forEach() method is a higher-order function – a function that receives another function as an argument.
    // Instead of looping over array elements, forEach() invokes a callback function on every element in turn.
    // The callback function accepts three arguments – the current array element, the array index, and the array itself.
    // In the following code, the original example has been rewritten to use the forEach() method.

    // var foo1 = ["a", "b", "c", "d"];
    // foo1.forEach(function(element, index, array) {
    //     //print(element);
    //     //print('element [' + index + ']: ' + element);
    //     //print(array);  //array is foo
    // });





    // map()
    // The map() function is nearly identical to forEach(). The only difference is that map() returns an array
    // containing the values returned by the callback function. For example, the following code uses map() to
    // compute the square root of each item in the input array.
    // >>>>>> The results are then returned as an array and displayed. <<<<<<
    //                          >>>> Array is returned!!! <<<<
    // Also notice that the array extras are compatible with built in JavaScript functions, such as Math.sqrt().

    // var sqrts = [1, 4, 9, 16, 25].map(Math.sqrt);
    // print(sqrts);
    // Result: 1,2,3,4,5





    // filter()
    // Like forEach() and map(), the filter() method takes a callback function and optional this value.
    // And, like map(), filter() returns an array of values based on the return value of the callback function.
    // The difference is that the filter() callback function should return a Boolean value.
    // >>>> If the return value is true, then the array element is added to the results array. <<<<
    //                          >>>> Array is returned!!! <<<<
    // For example, the following code removes any elements from the original array that don’t begin with the letter x.
    // In this example, a regular expression (passed as the this value) is tested against each array element.

    // var foo2 = ["x", "abc", "x1", "xyz"].filter(RegExp.prototype.test, /^x/);
    // print(foo2);
    //Result: x,x1,xyz




    // The every() and some()
    // The every() and some() functions also run a callback function on each array element.
    // If every callback function returns true,then every() returns true, otherwise it returns false.
    // Similarly, some() returns true if at least one callback function returns true.
    //
    // In the following example, every() and some() are used to test if array elements are less than five.
    // In this case, every() returns false because the final element is equal to five. However, some() returns true
    // because at least one element is less than five. Note that the index and array arguments exist,
    // but have been omitted from the callback function because they are not needed in this example.

    // var foo3 = [1,2,3,4,5];
    // var every = foo3.every(function(element) {
    //    return element < 5;
    // });
    // print('every is: ' + every); // every = false
    //
    // var some = foo3.some(function(element) {
    //        return element < 5;
    // });
    // print('some is: ' + some); // some = true




    // reduce() and reduceRight()
    // The reduce() method processes each element in an array, starting from the beginning, and computes a single value.
    // reduce() takes a callback function and an optional initial value as arguments. If the initial value is not present,
    // then the first array element is used. The reduce() callback function differs from the other callback functions we’ve seen thus far,
    // as it takes four arguments – the previous value, current value, index, and the array.
    //
    // A common example of a reduce operation is summing all of an array’s values. The following example does exactly this.
    // The first time the callback function is invoked, previous is equal to one, and current is equal to two. In subsequent invocations,
    // the sum is accumulated to a final value of 15.

    // The reduceRight() method works in the same fashion as reduce(), except that the processing begins at the end of the array and moves
    // towards the beginning.

    // var foo4 = [1, 2, 3, 4, 5].reduce(function(previous, current, index, array) {
    //   return previous + current;
    // });
    // print(foo4); // sum = 15



    // indexOf() and lastIndexOf()
    // The indexOf() method searches an array for a specific element, and returns the index of the first match.
    // If no match is found, indexOf() returns -1. indexOf() takes the element to search for as its first argument.
    // A second, optional, argument is used to specify the starting index of the search.
    //
    // For example, the following code locates the first two occurrences of the letter z in an array.
    // To find the second occurrence, we simply find the first occurrence, and then start searching again after it.

    // The lastIndexOf() method works exactly the same way, except it starts searching from the end of the array.

    // var foo = ["a", "z", "b", "z", "x", "y", "z"];
    // var first = foo.indexOf("z");
    // print(first); // 1
    // var second = foo.indexOf("z", first + 1);
    // print(second); // 3


})();