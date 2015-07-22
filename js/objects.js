/*========	Objects ========
1.Read my post JavaScript Objects in Detail http://javascriptissexy.com/javascript-objects-in-detail/
  Or read chapter 6 of JavaScript: The Definitive Guide.
  Or read chapter 6 of Professional JavaScript for Web Developers. NOTE: Only read the "Understanding Objects" section.
  Any of the 3 is fine, although the 2 textbooks go into more detail: the extra detail you can skip confidently, if you read and thoroughly understand my post.

  For more detail check my quide >>> https://docs.google.com/document/d/15dGt4mrRw5EQbd6UAjydGpjMe1I_h5rGJq4yHtX-9zk/edit?usp=sharing
======*/

//======	Reference Data Type and Primitive Data Types	======

	//======	The primitive data type String is stored as a value​
		var person = "Kobe";
		var person2 = person;
		person = "Brayan";
		//print(person2);//Kobe
		//print(person);//Brayan

	//======	Objekti se prenose po referenci, nikad se ne kopiraju
		var person = {name:'Zoki'};
		var person2 = person;
		person.name = 'Bojan'; // ili moze i person2.name = 'Bojan';
		//print(person.name);//Bojan
		//print(person2.name);//Bojan

		var a = {}, b = {}, c = {};  // a, b, and c each refer to a different empty object

		a = b = c = {}; // a, b, and c all refer to the same empty object

	//======	Operator || moze da se iskoristi za dodeljivanje difoltnih vrednosti
		var age = person.age || "unknown";

//======	Postoje 2 standardna nacina za kreiranje objekata: 	======

	//======	Objekat literal
	var myObj = {} // prazan objekat
	
	var mango = {
		color: "yellow",
		shape: "round", 
		sweetness: 8,
		
		howSweetAmI: function () {
			console.log("Hmm Hmm Good");
		}
	};

	//======	Objekat konstruktor 
	// Konstruktor je funkcija koja se koristi za inicijalizovanje novih objekata. Koristi se new kljucna rec za pozivanje konstruktora.

		var mango = new Object();

		mango.color = "blue",
		mango.shape = "round",
		mango.sweetness = 8,

		mango.howSweetAmI = function () {
			console.log ("Hmm mmm I am good");
		}

//======	Paterni za kreiranje objekata: 	======

	//Za proste objekte, ili objekate koji ce se mozda samo jednom koristiti, 2 navedena metoda za kreiranje objekata gorenavedena  su i vise nego dovoljna.

	//======	Funkcija konstruktor patern za kreiranje objekata
		function Fruit(theColor, theSweetness, theFruitName, theNativeLand){
			this.color = theColor;
			this.sweetness = theSweetness;
			this.fruitName = theFruitName;
			this.nativeToLand = theNativeLand;

			this.showNanme = function(){
				print("This is a " + this.fruitName);
			}
			this.nativeTo = function(){
				this.nativeToLand.forEach(function(eachCountry){
					print("Grown in " + eachCountry);
				});
			}
		}

		//With this pattern in place, it is very easy to create all sorts of fruits
		 /*
		 var mangoFruit = new Fruit("Yellow", 8, "Mango",["South America", "Central America", "West Africa"]);
		 mangoFruit.showNanme(); // This is Mango
		 mangoFruit.nativeTo(); // Grown in: South America...

		 var jabuka = new Fruit("crvena", 5, "jabuka",["Srbija"]);
		 jabuka.nativeTo();
		 */

	//======	Prototype patern za kreiranje objekata
		function Fruit(){}

		Fruit.prototype.color = "Yellow";
		Fruit.prototype.sweetness = 7;
		Fruit.prototype.fruitName = "Generic Fruit";
		Fruit.prototype.nativeToLand = "USA";

		Fruit.prototype.showNanme = function(){
			print("This is a " + this.fruitName);
		}

		Fruit.prototype.nativeTo = function(){
			print("Grown in " + this.nativeToLand);
		}

		//Ovako pozivamo konstruktor
		var mangoFruit = new Fruit();
		mangoFruit.showNanme(); // This is a Generic Fruit​
		mangoFruit.nativeTo();  // Grown in:USA

		// Svaki objekat lireral  je povezan sa Object.prototype od kog nasledjuje sve njegove propertije!
		// Kada se pravi novi objekat, moze se birati prototype objekat od kog ce naslediti sve sto treba!
		// Kada pravimo izmene na nasem objektu, objekat prototype je nedirnut!
		// Link protototypa se koristi samo za preuzimanje. 
		// DELEGATION - Ako objekat nema property, onda JS gleda u njegov prototype, ako ga i on nema, onda ide dalje na gore do Objct.prototype. Ako ga ni on nema onda vraca undefined.

//======	Reflection - utvrdjivanje da li objekat ima neki property	======
	var flight = {number:555};
	//typeof - odredjivanje tipa property-a 		typeof flight.number //vraca “number"

	//hasOwnProperty method - vraca true ili false ako objekat ima property
	flight.hasOwnProperty('number');  // true

	//hasOwnProperty method ne gleda prototype lanac:  
	flight.hasOwnProperty(constructor);  // false


//======	Accessing and Enumerating Properties on Objects
	// To access the enumerable (own and inherited) properties on objects, you use the for/in loop or a general for loop.

	var school = {schoolName:"Gimnazija",schoolAccreditation:true,schoolLocation:"Zajecar"};
	for(var eachItem in school){
		console.log(eachItem); // Prints schoolName, schoolAccredited, schoolLocation​
	}

//======	Accessing Inherited Properties
	/*
	Properties inherited from Object.prototype are not enumerable, so the for/in loop does not show them. 
	However, inherited properties that are enumerable are revealed in the for/in loop iteration.
	For example:
	Create a new HigherLearning function that the school object will inherit from.​
	SIDE NOTE: As Wilson (an astute reader) correctly pointed out in the comments below, 
	the educationLevel property is not actually inherited by objects that use the HigherLearning constructor; 
	instead, the educationLevel property is created as a new property on each object that uses the HigherLearning constructor. 
	The reason the property is not inherited is because we use of the "this" keyword to define the property.
	*/

		function HigherLearning(){
			this.educationLevel = "University";
		}

		// Implement inheritance with the HigherLearning constructor​
		var school = new HigherLearning(); //nasledjuje sve iz ove funkcije
		//konstruktor patern
		school.schoolName = "MIT";
		school.schoolAccredited = true;
		school.schoolLocation = "Massachusetts";

		//Use of the for/in loop to access the properties in the school object​
		for (var eachItem in school) {
			console.log(eachItem); // Prints educationLevel, schoolName, schoolAccredited, and schoolLocation​
		}

		/*In the last example, note the educationLevel property that was defined on the 
		HigherLearning function is listed as one of the school’s properties, 
		even though educationLevel is not an own property—it was inherited
		*/

//======	Object’s Prototype Attribute and Prototype Property
		/*
		The prototype attribute and prototype property of an object are critically important concepts 
		to understand in JavaScript. 
		Read my post JavaScript Prototype in Plain, Detailed Language for more. 
		http://javascriptissexy.com/javascript-prototype-in-plain-detailed-language/
		*/


//Objects in detail from: Chapter 6 of Professional JavaScript for Web Developers





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



