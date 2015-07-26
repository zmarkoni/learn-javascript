//====================================================================================
//==================================	Object’s 	==================================
//====================================================================================
/*
Read my post JavaScript Objects in Detail http://javascriptissexy.com/javascript-objects-in-detail/
Or read chapter 6 of JavaScript: The Definitive Guide.
Or read chapter 6 of Professional JavaScript for Web Developers. NOTE: Only read the "Understanding Objects" section.
Any of the 3 is fine, although the 2 textbooks go into more detail: the extra detail you can skip confidently, if you read and thoroughly understand my post.
For more detail check my quide >>> https://docs.google.com/document/d/15dGt4mrRw5EQbd6UAjydGpjMe1I_h5rGJq4yHtX-9zk/edit?usp=sharing

JS ima jedan komplekasan tip podatka a to je Objekat i on je promenljiv (mutable)
ima 5 prostih tipova podataka: Number, String, Boolean,Undefined i Null (oni su immutable - nepromenjivi su)

Objekat je neuredjena lista primitivnih tipova podataka, referenci koji se cuvaju 
kao serija ime-vrednost parova koji se nazivaju property, dok se funkcije zovu metodi.
*/

var myFirstObject = {firstName: "Richard", favoriteAuthor: "Conrad"}; // string
//print(myFirstObject.firstName); // Children​

//Property names can be a string or a number, but if the property name is a number, it has to be accessed with the bracket notation
var ageGroup = {30: "Children", 100:"Very Old"};
//print(ageGroup["30"]); // Children​

/*
Object data properties also have ===== 3 attributes =====
Ove atribute ne koristimo u praksi ali dobro je da se znaju i setovani su na true po difoltu.
=Configurable= atribut (specificira da li property moze biti obrisan ili promenjen)
=Enumerable= (specificira da li property moze biti vracen (RETURNED) u for/in petlji ).
=Writable= ( Specificira da li objekat moze biti promenjen)
*/

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
	// Konstruktor je funkcija koja se koristi za inicijalizovanje novih objekata. 
	//Koristi se === new === kljucna rec za pozivanje konstruktora.

	var mango = new Object();
	mango.color = "blue",
	mango.shape = "round",
	mango.sweetness = 8,

	mango.howSweetAmI = function () {
		console.log ("Hmm mmm I am good");
	}

//======	Paterni za kreiranje objekata: 	======

	//Za proste objekte, ili objekate koji ce se mozda samo jednom koristiti, 
	//2 navedena metoda za kreiranje objekata gorenavedena  su i vise nego dovoljna.

	//======	Funkcija konstruktor patern za kreiranje objekata =====
	/*
	To create a new instance of Person, use the new operator. Calling a constructor in this manner essentially causes the following four steps to be taken:
		1. Create a new object.
		2. Assign the === this === value of the constructor to the new object (so this points to the new object).
		3. Execute the code inside the constructor (adds properties to the new object).
		4. Return the new object.
		======= Vazno ========
		Constructors defined in this manner are defined on the Global object (the window object in web browsers), which is not good
		*/

		function Person1(name, lastname, age){
			this.name = name;
			this.lastname = lastname;
			this.age = age;

			this.showNanme = function(){
				print("Person name is: " + this.name);
			}
		}

		var person1 = new Person1("Zoran","Markovic",31);
		//person1.showNanme();

	 	//The only difference between constructor functions and other functions is the way in which they are called.
	 	//Example:
			 	//use as a constructor
				var person = new Person1("Nicholas", "Software Engineer", 29); 
				//person.showNanme(); //"Nicholas"
				
				//call as a function
				Person1("Greg", "Doctor", 27); //adds to window 
				//window.showNanme(); //"Greg"

				//call in the scope of another object 
				var obj1 = new Object();
				Person1.call(obj1, "Kristen", "Nurse", 25); 
				//obj1.showNanme(); //"Kristen"
				//print(obj1.age);

	/*
	The first part of this example shows the typical use of a constructor, to create a = new = object via the new operator. 
	The second part shows what happens when the Person() function is called without the new operator: the properties and methods get added to the window object. 
	Remember that the this object always points to the Global object (window in web browsers) when a function is called without an explicitly set this value 
	(by being an object method or through call()/apply()). 
	So after the function is called, the sayName() method can be called on the window object, and it will return “Greg”. 
	The Person() function can also be called within the scope of a particular object using call() (or apply()). In this case, it’s called with a this value of the object o, which then gets assigned 
	all of the properties and the sayName() method.
	
	VAZNO:
	Though the constructor paradigm is useful, it is not without its faults. 
	The major downside to constructors is that methods are created once for each instance
	
	VAZNO:
	Inherited propery je definisan na objekat prototype poropertiju.
	someObject.firstName = "Zoki";

	Sopstveni property je difinisan direktno na samom objektu
	var noviObjekat = new Person1();
		noviObjekat.education = "ELFAK";
	Ovako smo kreirali novi property samo za ovaj objekat i njega ne vide ostali objekti koji nasledjuju propertije od objekata Person1!!!
	*/


	//======	Prototype patern za kreiranje objekata ====
	
	//The benefit of using the prototype is that all of its properties and methods are shared among object instances
	function Person2(){}
	Person2.prototype.name = "Zoran";
	Person2.prototype.lastname = "Markovic";
	Person2.prototype.age = 31;

	Person2.prototype.showPersonInfo = function(){
		print("Person info: " + 'name: ' + Person2.prototype.name +', lastname: ' + Person2.prototype.lastname + ', age: ' + Person2.prototype.age);
	}

	var p1 = new Person2();
	//p1.showPersonInfo();

	var p2 = new Person2();
	//p2.showPersonInfo();

	//alert(person1.sayName == person2.sayName); //true

	// Svaki objekat lireral  je povezan sa Object.prototype od kog nasledjuje sve njegove propertije!
	// Kada se pravi novi objekat, moze se birati prototype objekat od kog ce naslediti sve sto treba!
	// Kada pravimo izmene na nasem objektu, objekat prototype je nedirnut!
	// Link protototypa se koristi samo za preuzimanje. 
	// DELEGATION - Ako objekat nema property, onda JS gleda u njegov prototype, ako ga i on nema, onda ide dalje na gore do Objct.prototype. 
	//              Ako ga ni on nema onda vraca undefined.

	//The benefit of using the prototype is that all of its properties and methods are shared among object instances. 
	//Instead of assigning object information in the constructor, they can be assigned directly to the prototype, 


	//===== The isPrototypeOf() method ==== 
	//It can be used to determine if this relationship exists between objects. 
	//Essentially, isPrototypeOf() returns true if [[Prototype]] points to the prototype on which the method is being called, 
	//as shown here:
		//alert(Person2.prototype.isPrototypeOf(p1)); //true 
		//alert(Person2.prototype.isPrototypeOf(p2)); //true


	//==== Object.getPrototypeOf() ====
	//It returns the =value= of [[Prototype]] in all supporting implementations. 
	//Using Object.getPrototypeOf(), you are able to retrieve an object’s prototype easily, 
	//which becomes important once you want to implement inheritance using the prototype!!!
	//For example:
		//alert(Object.getPrototypeOf(p1) == Person2.prototype); //true 
		//alert(Object.getPrototypeOf(p1).name); //"Zoran"


	//===== REFLECTION 	The hasOwnProperty() method ==== 
	//This method, which is inherited from Object, returns true only if a property of the given name exists on the object instance, 
	// as in this example:

	function Person3(){ }
	Person3.prototype.name = "Nicholas"; 
	Person3.prototype.age = 29; 
	Person3.prototype.job = "Software Engineer"; 
	Person3.prototype.sayName = function(){
		print(this.name); 
	};

	var person1 = new Person3(); 
	var person2 = new Person3();

	//alert(person1.hasOwnProperty("name"));  //false because name exsists in prototype

	person1.name = 'Greg';
	//alert(person1.name); //Greg - from instance 
	//alert(person1.hasOwnProperty('name')); //true

	//alert(person2.name); //Nicholas - from prototype
    //alert(person2.hasOwnProperty('name'));  //false

    delete person1.name;
    //alert(person1.name); //Nicholas - from the prototype 
    //alert(person1.hasOwnProperty(“name”)); //false

    //==== IN operator return TRUE if a property of the given name exists on the object instance or prototype, 
    //It’s possible to determine if the property of an object exists on the prototype 
    //by combining a call to hasOwnProperty() with the in operator like this:
    	function hasPrototypeProperty(object, name){
    		return !object.hasOwnProperty(name) && (name in object);
    	}

    	var person3 = new Person3();
		//alert(hasPrototypeProperty(person3, 'name'));  //true

		person3.name = 'Bojan';
		//alert(hasPrototypeProperty(person3, 'name'));  //false because property name is from object instance

	//====== Using ==== in operator for	Accessing and Enumerating Properties on Objects
	// To access the enumerable (own and inherited) properties on objects, you use the for/in loop or a general for loop.

	var school = {schoolName:"Gimnazija", schoolAccreditation:true, schoolLocation:"Zajecar"};
	for(var eachItem in school){
		//print(eachItem); // Prints schoolName, schoolAccredited, schoolLocation​
	}

//===== VAZNO ===== VAZNO ===== ==============================================
//====== Problems with Prototypes =====
	//The prototype pattern isn’t without its faults. 
	//For one, it negates the ability to pass initialization arguments into the constructor, meaning that all instances get the same property values by default.
	//The main problem comes with their shared nature - The real problem occurs when a property contains a reference value.

	function Person4(){ 
	}
	
	Person4.prototype = { 
		constructor: Person4, 
		name : 'Nicholas', 
		age : 29,
		job : 'Software Engineer',
	    friends : ['Shelby', 'Court'],
		sayName : function () { 
			alert(this.name);
		} 
	};
	
	var person1 = new Person4(); 
	var person2 = new Person4();
	
	person1.friends.push('Van');
	//alert(person1.friends);    //”Shelby,Court,Van”
	//alert(person2.friends);    //”Shelby,Court,Van” 		Sto je glupooooo!!!
	//alert(person1.friends === person2.friends);  //true 	ne valja ovako!!!

	//VIDI i OVO
	//==========================================================================================
	//======	Object’s Prototype Attribute and Prototype property 	========================
	//==========================================================================================

	/*
	The prototype attribute and prototype property of an object are critically important concepts 
	to understand in JavaScript. 
	Read my post JavaScript Prototype in Plain, Detailed Language for more. 
	http://javascriptissexy.com/javascript-prototype-in-plain-detailed-language/
	*/

	
	//================================================================================================
	//======	Combination Constructor/Prototype Pattern	=====	NAJBOLJI	===================================
	//================================================================================================
	/*
	The =constructor pattern= defines instance properties, 
	whereas the =prototype pattern= defines methods and shared properties. 

	With this approach, each instance ends up with its own copy of the instance properties, 
	but they all share references to methods, conserving memory. 

	This pattern allows arguments to be passed into the constructor as well, effectively combining the best parts of each pattern. 
	*/

	function Persons (name, age, job){
		this.name = name;
		this.age = age;
		this.job = job;
		this.friends = ['Mila', 'Nenad'];
	}

	Persons.prototype = {
		constructor:Persons,
		sayName: function(){
			print(this.name);	
		}
	};

	var p1 = new Persons("Zoran", 32, "Developer");
	var p2 = new Persons("Jeka", 29, "Pravnik");

	p1.friends.push("Dane");

	//print(p1.friends); //”Shelby,Court,Van” 
	//print(p2.friends); //”Shelby,Court” 
	//print(p1.friends === p2.friends); //false 
	//print(p1.sayName === p2.sayName); //true

/* ZAKLJUCAK:
	Note that the instance properties are now defined solely in the constructor, 
	and the shared property constructor and the method sayName() are defined on the prototype. 

	When person1.friends is augmented by adding a new string, person2.friends is not affected, 
	because they each have separate arrays.

	The hybrid constructor/prototype pattern is the most widely used and accepted practice for defining custom reference types in ECMAScript. 
	Generally speaking, this is the default pattern to use for defining reference types.
*/



