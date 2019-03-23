// Promises
// https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md

var p = new Promise( function(resolve,reject){
	resolve( 42 );
} );

// Promise.resolve( 43 )
//Promise.resolve( p )
// p.then(
// 	function fulfilled(val){
// 		console.log( val );
// 	},
// 	function rejected(err){
// 		console.log( err );
// 	}
// );

function fulfilled(msg) {
	console.log( msg );
}

function rejected(err) {
	console.error( err );
}

p.then(
	fulfilled,
	rejected
);

// Error handling - vidi appendix A za resenje
// var e = Promise.reject( "Oops" );
//
// e.then(
// 	function fulfilled(){
// 		// never gets here
// 	},
// 	function rejected(err){
// 		console.log( err ); // "Oops"
// 	}
// );

//While this pattern of error handling makes fine sense on the surface, the nuances of Promise error handling are often a fair bit more difficult to fully grasp.
//Consider:

// var e1 = Promise.resolve( 42 );
//
// e1.then(
// 	function fulfilled(msg){
// 		// numbers don't have string functions,
// 		// so will throw an error
// 		console.log( msg.toLowerCase() );
// 	},
// 	function rejected(err){
// 		// never gets here
// 	}
// );

// var e2 = Promise.reject( "Oops" ).defer();
//
// // `foo(..)` is Promise-aware
// foo( 42 )
// .then(
// 	function fulfilled(){
// 		return e2;
// 	},
// 	function rejected(err){
// 		// handle `foo(..)` error
// 	}
// );

// All



// Race