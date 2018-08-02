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

    it('should spy on save', function () {
		var spy = spyOn(myObj, 'save');
		myObj.save(); // like this we are actually call spy!
		expect(spy).toHaveBeenCalled();
    });

    it('should spy on getQuantity', function () {
		var spy = spyOn(myObj, 'getQuantity').andReturn(10);
		expect(myObj.getQuantity()).toEqual(10); // this will work
    });

    // create fake implementation of a function
    it('should spy on getQuantity fake', function () {
		var spy = spyOn(myObj, 'getQuantity').andCallFake(function () {
			console.log('returning 20');
			return 20;
        });
		expect(myObj.getQuantity()).toEqual(20);
    });

});

