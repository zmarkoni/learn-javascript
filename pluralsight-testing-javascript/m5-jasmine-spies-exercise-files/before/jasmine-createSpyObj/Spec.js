// Creating full spy Objects with methods
// Instead of using spyOn over and over again
// This is for Object which have dependencies, we can call createSpyObjects and test all Objects methods
describe("Spies", function() {

	it("should create a spy object", function() {
		var spy = jasmine.createSpyObj('mySpy', ['getName', 'save']);

		// fake implementation of getName method
		spy.getName.andReturn("bob");

		// fake implementation of save method
		spy.save.andCallFake(function() { console.log('save called');});

		expect(spy.getName()).toEqual("bob");
		spy.save();
		expect(spy.save).toHaveBeenCalled();
	});

	
	

});

