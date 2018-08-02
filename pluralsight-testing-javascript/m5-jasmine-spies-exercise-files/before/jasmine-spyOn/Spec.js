// spyOn function is used to spy on a method of an object!!!
// We can spy for dependencies
// it is global function
// usage: spyOn(object, "methodName");
// We are checking if method exist

var myObj = {
	save: function() {
		//...
	},
	getQuantity: function() {
		return 5;
	}
}

describe("Spies", function() {

	// Check if callBack function is called
    it('should spy on save', function () {
		var spy = spyOn(myObj, 'save');
		myObj.save(); // like this we are actually call spy!
		expect(spy).toHaveBeenCalled();
    });

    // andReturn -> Check return of a function
    it('should spy on getQuantity', function () {
		var spy = spyOn(myObj, 'getQuantity').andReturn(10);
		expect(myObj.getQuantity()).toEqual(10); // this will work
    });

    // andCallFake -> create fake implementation of a function
    it('should spy on getQuantity fake', function () {
		var spy = spyOn(myObj, 'getQuantity').andCallFake(function () {
			console.log('returning 20');
			return 20;
        });
		expect(myObj.getQuantity()).toEqual(20);
    });

    // andCallThrough
    // monitor how much time function is called
	// monitor arguments that are passed 
    it('should spy on getQuantity callThrow', function () {
		var spy = spyOn(myObj, 'getQuantity').andCallThrough(function () {
			expect(myObj.getQuantity()).toEqual(5);
			expect(spy).toHaveBeenCalled();
        });
    });

    // spy throw error, sta se desava kad baci gresku
	it('should spy on getQuantity Throw', function () {
		var spy = spyOn(myObj, 'getQuantity').andThrow(new Error('problem'));
			var qty;
			try {
				gty = myObj.getQuantity();
			} catch (ex) {
				qty = 100; // catch error and set nnew value
			}
			expect(qty).toEqual(100);
	});

});

