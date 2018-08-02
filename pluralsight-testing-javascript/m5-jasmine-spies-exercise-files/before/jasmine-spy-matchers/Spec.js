
describe("Spies", function() {

	it("should verify arguments", function() {
		var spy = jasmine.createSpy('mySpy');
		spy(1, 1); // don't care about this one till there is one which will pass
		spy(3); // don't care about this one till there is one which will pass
		spy(2); // don't care about this one till there is one which will pass
		spy(1); // position does not meter
		expect(spy).toHaveBeenCalledWith(1);
	});

	it("should verify arguments that weren't called", function() {
		var spy = jasmine.createSpy('mySpy');
		spy(1);
		spy(4, 1);
		spy(2);
		expect(spy).not.toHaveBeenCalledWith(4);
	});

	it("should verify arguments that weren't called", function() {
		var myObj = {method: function() {}}
		var spy = spyOn(myObj, "method");
		myObj.method(1);
		myObj.method(2);
		myObj.method(3);
		
		expect(spy.calls[0].args[0]).toEqual(1);
		expect(spy.calls[0].object).toEqual(myObj);
		expect(spy.calls.length).toEqual(3);
		expect(spy.callCount).toEqual(3);
		expect(spy.mostRecentCall.args[0]).toEqual(3);
		expect(spy.argsForCall[1][0]).toEqual(2);
	});

	it('should work with utility methods', function() {
		var spy = jasmine.createSpy('a spy');
		expect(jasmine.isSpy(spy)).toEqual(true);
		spy();
		spy.reset();
		expect(spy.callCount).toEqual(0);
	})

	// Test metadata
	/*
	calls[]
	calls[].args[]
	calls[].object
	 */
    it('should work with metadata', function () {
		var myObj = {
			method: function () {
				//console.log('test methadata');
            }
		};

		var spy = spyOn(myObj, "method");
		myObj.method(1);
		myObj.method(20);
		myObj.method(3);

		// using calls[]
		expect(spy.calls[0].args[0]).toEqual(1);
		expect(spy.calls[1].args[0]).toEqual(20);

		// check if is object
		expect(spy.calls[0].object).toEqual(myObj);

		// check length
		expect(spy.calls.length).toEqual(3); // 3 times is called

		// using callCount
		expect(spy.callCount).toEqual(3);

		// mostRecentCall
		expect(spy.mostRecentCall.args[0]).toEqual(3);

		// argsForCall[]
		expect(spy.argsForCall[1][0]).toEqual(20);
    });

    // Jasmine Utility methods

	// jasmine.isSpy check if a method is a spy
    it('should work woth utility methods', function () {
		var spy = jasmine.createSpy('a spy');
		expect(jasmine.isSpy(spy)).toEqual(true);

		spy();
		spy.reset();
		expect(spy.callCount).toEqual(0);
    });

    // reset which methods on spy's

});

