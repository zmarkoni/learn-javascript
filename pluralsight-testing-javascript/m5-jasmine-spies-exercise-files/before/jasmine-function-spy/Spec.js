// Jasmine Spy is mainly used for callBack Functions

function callMyCallback(cb) {
	cb();
}

describe("Spies", function() {
  
  it("should spy on a callback", function() {
      var spyCB = jasmine.createSpy('myspay');
      callMyCallback(spyCB);
      expect(spyCB).toHaveBeenCalled();
  });
  
});

