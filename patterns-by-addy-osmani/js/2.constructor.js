// ================ I CONSTRUCTOR PATTERNS  ====================================

//  Basic Constructor
function Car1( model, year, miles ) {
    this.model = model;
    this.year = year;
    this.miles = miles;

    this.carInfo1 = function () {
        return this.model + " has done " + this.miles + " miles!";
    };
}

//Usage:
//Create new instance of the car
var car1 = new Car1( "Megane", 2006, 1600000);
//print( car1.carInfo1() );

// ===== Constructors With Prototypes ======================================

function Car2( model, year, miles ) { //Isto
    this.model = model;
    this.year = year;
    this.miles = miles;
}

//Metod ide napolje u prototype
Car2.prototype.carInfo2 = function () {
    return this.model + " has done " + this.miles + " miles!";
};

var car2 = new Car2 ("BMW", 2010, 2000000);
//print( car2.carInfo2() );