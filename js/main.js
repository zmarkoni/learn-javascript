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

MYAPP.stooge = {
	first_name: "Zoran",
	gender : "male"
};

MYAPP.another_stooge = Object.create(MYAPP.stooge); //Nasledio od stooge-a sve
	MYAPP.another_stooge.last_name = 'Markovic'; // dodao sam nov property


// document.writeln(stooge.first_name);
 //print(MYAPP.another_stooge.last_name);
 //print(MYAPP.another_stooge.greska);

// =============== FUNCTIONS =============================================

// THE METHOD INVOCATION PATTERN
var myObj = {
	value: 0, //property
	increment: function (inc) {
		//var value = 10; // value = 10 - ne cita je
		//this.value = 0 i dalje VAZNO!!!
		this.value += typeof inc === 'number' ? inc : 1;
	}
	
};//Objekat se zavrsava tackom i zarezom uvek, a metod ne 

//myObj.increment(1);
myObj.increment(11);
print(myObj.value);

//The Function invocation pattern		

//dodajem novi metod
myObj.double = function () {
	var that = this; // Workaround.
	//Ovde bi radilo
	//return add(this.value, this.value);

	var helper = function () {
	    //Unutrasnja funkcija vidi this kao globalnu	
	    //this.value = add(this.value, this.value); ne moze
		that.value = that.value + that.value;
	};
							
	helper(); // Invoke helper as a function.
};	

			
// Invoke double as a method.				
myObj.double();
print(myObj.value);




// =============== EXCEPTIONS =============================================

var add = function (a,b) {
	if(typeof a !== "number" || typeof b !== 'number'){
		throw {
			name: "TypeError",
			message: 'ADD needs numbers!'
		};
	}
	var result = a + b;
	print(result);
}

var try_it = function () {
	try {
		add('one','two');
		// add(1, 2);
	}catch(e) {
		print(e.name);
		print(e.message);
	}
}

// try_it();

// ===============  Closure	 =============================================
var myObject = function() {
	var value = 0;

	return {
		increment: function (inc) {
			value += typeof inc === 'number' ? inc : 3;
		},
		getValue: function (){
			return value;
		}
	}
}(); // uglaste zagrade na kraju, znace da se varijabli dodeljuje rezultat funkcije a ne funkcija

//myObject.increment('pera');
//print(myObject.getValue());

var fade = function (node) {
	var level = 1;
	var step = function () {
		var hex = level.toString(16);
		node.style.backgroundColor = "#FFFF" + hex + hex;
		if (level < 15) {
			level += 1;
			setTimeout(step,1000);
		}
	};
	setTimeout(step,1000);
}

//fade(document.body);

// Make a function that assigns event handler functions to an array of nodes the right way.
// When you click on a node, an alert box will display the ordinal of the node.

var add_the_handlers = function (nodes) {
	var i;
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].onClick = function (i) {
			return function (e) {
				alert(e);
			};
		}(i);
	}
};

// ===============  Moduls	 =============================================

     // Produce an object that produces unique strings. A
     // unique string is made up of two parts: a prefix
     // and a sequence number. The object comes with
     // methods for setting the prefix and sequence
     // number, and a gensym method that produces unique
     // strings.
var serial_maker = function () {
	var prefix = '';
	var seq = 0;

	return {
		set_prefix: function(p) {
			prefix = String(p);
		},
		set_seq: function (s) {
			seq = s;
		},
		gensym: function () {
			var result = prefix + seq;
			seq += 1;
			return result;
		}
	};
};

var seqer = serial_maker(); // ladno moze i ovako!!!
seqer.set_prefix("ZM");
seqer.set_seq(1000);
var mySerialNumber = seqer.gensym();
//print(mySerialNumber);

// ===============  Moduls	 =============================================

// We can use functions and closure to make modules. 
// A module is a function or object that presents an interface but 
// that hides its state and implementation.

// ===============  Prototype Inheritance -	differential =============================================

//Using only objects, no clases !!!

var myMammal = {
	name : 'Herb the Mammal',
	get_name : function (){
		return this.name;
	},
	says : function (){
		return this.saying || '';
	}
};

//This is differential inheritance. By customizing a new object, 
//we specify the differ- ences from the object on which it is based.
var myCat = Object.create(myMammal);

myCat.name = 'Henrietta';
myCat.saying = 'meow';

myCat.get_name = function(){
	return this.says() + ' ' + this.name + ' ' + this.says();
}
//print(myCat.name);
//print(myCat.get_name());

// ===============  Prototype Inheritance - FUNCTIONAL(MODULE) PATTERN	 =============================================

//Using functions !!!

var mammal = function (spec) {
	var that = {};
	that.get_name = function () { //privatan metod
		return spec.name; //ne koristimo this
	};

	that.says = function () {
		return spec.saying || 'nista';
	};

	return that;
};

var z = mammal({name:'Zoki'});

// print(z.get_name());
// print(z.says());

var cat = function(spec) {
	spec.saying = spec.saying || 'meow'; // privatno
	var that = mammal(spec); //Ovde nasledjujemo sve iz mammal
	that.purr = function (n) {
    	var i, s = '';
   		for (i = 0; i < n; i += 1) {
        	if (s) {
            	s += '-';
			}
			s += 'r'; 
		}
		return s; 
	};
	that.get_name = function () { //extend method
		return that.says() + ' ' + spec.name + ' ' + that.says();
	};
	
	return that;
	
};

	var maca = cat({name:'Tom'});

	//print(maca.get_name());
	//print(maca.purr(5));
	// print(maca.says());

//Super method
//make a superior method that takes a method name and returns a function 
//that invokes that method. The function will invoke the original method 
//even if the property is changed

// Object.method('superior', function(name){
// 	var that = this,
// 		mathod = that[name];
// 		return function(){
// 			return  method.apply(that, arguments);
// 		};
// });

// var coolcat = function(spec) {
// 	var that = cat(spec),
// 		super_get_name = that.superior('get_name');

// 	that.get_name = function(n) {
// 		return 'like' + super_get_name() + 'baby';
// 	};
// 	return that;
// };

// var myCoolCat = coolcat({name: 'Bix'}); 
// var name = myCoolCat.get_name(); // 'like meow Bix meow baby'
// print(name);




