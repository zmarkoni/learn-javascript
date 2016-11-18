//=======
;
define(function(){
	var Runner = function(){
   		$("body").on("click", ".js_show_step", $.proxy(this.showStep, this)); //this je Runner objekat
		
	};

	Runner.prototype = {
		
		currentStep:null,

		showStep: function(event) //jquery mi prosledjuje this(difoltna funkcionalnost jQuery-a)
    	{
    		var currentEl = $(event.currentTarget); //(difoltna funkcionalnost jQuery-a) ovako dobija this kliknutog elementa, tj. js_show_step
    		var parentEl = $(currentEl).parents('.js_step');
    		parentEl.removeClass("show_step");
      		
      		var nextEl = currentEl.attr('rel');
      		$(nextEl).addClass("show_step");	
    	}
	}

	return Runner;	
});
