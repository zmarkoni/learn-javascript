var MYAPP = {}; //Create single global variable, it's becomes a NAMESPACE

MYAPP.placeholder = document.getElementById('placeholder');

function print(result) {
	var iDiv = document.createElement('div');
  	iDiv.id = 'block';
  	iDiv.className = 'block';
  	iDiv.innerHTML = 'Result: ';
  	
  	MYAPP.placeholder.appendChild(iDiv).innerHTML += result;
}

//Funkcija pomocu koje nasledjujemo sve propertije
if(typeof Object.create !== 'function') {
	Object.create = function(o) {
		var F = function(){};
		F.prototype = o;
		return new F();
	};
}