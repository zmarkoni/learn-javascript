// ===============  Prototype Inheritance - differential =============================================

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

// ===============  Prototype Inheritance - FUNCTIONAL(MODULE) PATTERN   =============================================

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
//  var that = this,
//      mathod = that[name];
//      return function(){
//          return  method.apply(that, arguments);
//      };
// });

// var coolcat = function(spec) {
//  var that = cat(spec),
//      super_get_name = that.superior('get_name');

//  that.get_name = function(n) {
//      return 'like' + super_get_name() + 'baby';
//  };
//  return that;
// };

// var myCoolCat = coolcat({name: 'Bix'});
// var name = myCoolCat.get_name(); // 'like meow Bix meow baby'
// print(name);




