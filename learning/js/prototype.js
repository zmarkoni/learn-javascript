// ===============  Prototype  by Kyle Simpson ima i dijagram! =============================================
//https://www.youtube.com/watch?v=ORrHP1gcM0U start video
/*
When {{ new }} keyword is called, 4 thing are happen:
    1. Create a new object.
    2. Linked it, Assign the this value of the constructor to the new object (so this points to the new object).
    3. Execute the code inside the constructor (adds properties to the new object).
    4. Return the new object

When {{ Object.create }} is called
    It's doing only first 2 steps
*/

// ========== klasican nacin ==================
//https://www.youtube.com/watch?v=euCGI_LYs60
function Foo(who) {
    this.me = who;
}

Foo.prototype.indentify = function() {
    return "I am " + this.me;
}

function Bar(who) {
    Foo.call(this,who);
}

//Bar.prototype = new Foo(); //ne valja ovako
Bar.prototype = Object.create(Foo.prototype);
//NOTE: .constructor is broken here, need fix

Bar.prototype.speak = function() {
    alert("Hello, " + this.indentify() + ".");
}

var b1 = new Bar("b1");
var b2 = new Bar("b2");

//b1.speak();  //alerts Hello I am b1
//b2.speak();  //alerts Hello I am b2

// =========== OLOO Object Linked to Other Objects {{ new concept }} ========================
//Uproscujemo kod odozgo
//https://www.youtube.com/watch?v=-eoGE6wfpgE
var Fooo = {
    init: function(who) {
        this.me = who;
    },
    indentify: function() {
        return "I am " + this.me;
    }
};

var Barr = Object.create(Fooo);

Barr.speak = function() {
    alert("Hello, " + this.indentify() + ".");
};

var b = Object.create(Barr);
b.init("bbb");
b.speak();  //alerts Hello I am bbb

//b1 delegating to Bar, delegating to Foo

//polifil ako Object.create nije podrzan

if(!Object.create) {
    Object.create = function(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }
}














