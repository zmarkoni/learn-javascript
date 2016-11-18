//Module approach - have private variables and methods

//Kada koristimo module, gubimo DELEGATION

Widget = (function(){
    return {
        init: function(width, height) {
            this.width = width || 50;
            this.height = height || 50;
            this.$elem = null;
        },

        insert: function($where) {
            if(this.$elem) {
                this.$elem.css ({
                    width: this.width + "px",
                    height: this.height + "px"

                }).appendTo($where);
            }
        }
    };
})();

Button = (function(){

    var _width, _height, _label, $elem; //private

    // var publicAPI = {};
    var publicAPI = Object.create(Widget); // opet radim kao OLOO, jer kad hocu da radim DELEGATION moram da idem PUBLIC

    publicAPI.setup = function(width,height,label) {
        this.init(width,height); //delegate to Widget init
        publicAPI._width = width;
        publicAPI._height = height;
        _label = label || "Default";
        this.$elem = $("<button>").text(_label); //referencira se na $elem is widgeta
    };

    publicAPI.build = function($where) {
        this.insert($where); //delegate insert
        this.$elem.click(this.Klikni.bind(this)); //referencira se na $elem is widgeta
    };

    publicAPI.Klikni = function(evt) {
        console.log("Button '" + _label + "' is clicked!")
    };

    return publicAPI;
})();


$(document).ready(function() {
    var $placeholder = $("#placeholder");

    var btn1 = Object.create(Button);
    btn1.setup(100,50,"Hi btn1");

    var btn2 = Object.create(Button);
    btn2.setup(200,100,"Hi btn2");

    btn1.build($placeholder);
    btn2.build($placeholder);
});

