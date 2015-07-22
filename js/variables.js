// ============ Global variables ==========
// Jedan od nacina da se broj globalnih varijabli smanji na minimum je da definisemo jednu, 
// koja postaje kontejner za aplikaciju	

var APP = {}; //Create single global variable, it's becomes a NAMESPACE

APP.placeholder = document.getElementById('placeholder');

APP.stooge = {
	first_name: "Zoran",
	gender : "male"
};

APP.another_stooge = Object.create(APP.stooge); //Nasledio od stooge-a sve
	APP.another_stooge.last_name = 'Markovic'; // dodao sam nov property

// print(MYAPP.stooge.first_name);
// print(MYAPP.another_stooge.first_name);
// print(MYAPP.another_stooge.last_name);



