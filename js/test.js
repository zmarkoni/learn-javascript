//Object literal
var Person = {
    name:"Zoran",
    age:27,
    showPerson:function(){
        print(this.name + ", " + this.age);
    }
}

var p = Person;
//    p.showPerson();

//Constructor
var Person1 = new Object();
Person1.name = "Zoki";
Person1.age = 30;
Person1.showPerson = function(){
    print(this.name + ", " + this.age);
}

var p1 = Person1;
//    p1.showPerson();


//Function Constructor
function Person2(name, age){
    this.name = name,
    this.age = age,
    this.showPerson = function(){
        print(this.name + ", " + this.age);
    }
}

var p2 = new Person2("Jelena",29);
    //p2.showPerson();

//Function Prototype
function Person3() {};
    Person3.prototype.name = "Jeka";
    Person3.prototype.age = 28;

    Person3.prototype.showPerson = function(){
        print("Person info >>> " + 'name: ' + Person3.prototype.name + ', age: ' + Person3.prototype.age);
    }

var p3 = new Person3();
    p3.showPerson();

//Function Constructor/Prototpe patern = the BEST

function Person4(name, age){
    this.name = name,
    this.age = age
}

Person4.prototype.showPerson = function(){
    print(this.name + ", " + this.age);
};

var p4 = new Person4("Sara",20);
//p4.showPerson();
