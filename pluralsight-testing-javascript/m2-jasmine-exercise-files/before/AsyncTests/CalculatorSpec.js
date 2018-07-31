
describe("Calculator", function() {
	var calc;

	describe('FX Tests', function () {
		var el;

		beforeEach(function () {
			el = $("<div>some content</div>");
			$("#container").append(el);
			calc = new Calculator(el);
        });
		
		afterEach(function () {
			el.remove();
        });

        it('should work with a visual effect', function () {
			var flag = false;
            var callback = function () {
                flag = true;
                console.log('callback call by calc: ' + flag);
            };

			runs(function () {
                calc.hideResult(callback);
            });

            waitsFor(function () {
                return flag;
            }, "flag to be true", 1100);

            runs(function () {
                expect(el.css("display")).toBe("none");
            });
        });

    });
   
});
