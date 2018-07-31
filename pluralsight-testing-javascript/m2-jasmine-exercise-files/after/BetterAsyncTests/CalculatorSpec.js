/*
	async test don't exists in Jasmine, it is developed by Derick Bailey
	and it can be included as addOne/plugin
	http://github.com/derickbailey/jasmine.async

	Use jasmine.async
 */
describe("Calculator", function() {
	var calc, el;
	var async = new AsyncSpec(this);
	
	beforeEach(function() {
		el = $("<div>some content</div>");
		$("#container").append(el);
		calc = new Calculator(el);
	});
	
	afterEach(function() {
		el.remove();
	});

	async.it('should make the result invisible', function(done) {
		var callback = function() {
			expect(el.css('display')).toBe('none');
			done();
		};
		
		calc.hideResult(callback);
	});
});
