//Classical OLLO approach

var Widget = { //object instead of function
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

var Button = Object.create(Widget);

Button.setup = function(width,height,label) {
    this.init(width,height); //delegate to Widget init
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
};

Button.build = function($where) {
    this.insert($where); //delegate insert
    this.$elem.click(this.Klikni.bind(this));
};

Button.Klikni = function(evt) {
    console.log("Button '" + this.label + "' is clicked!")
}

$(document).ready(function() {
    var $placeholder = $("#placeholder");

    var btn1 = Object.create(Button);
    btn1.setup(100,50,"Hi btn1");

    var btn2 = Object.create(Button);
    btn2.setup(200,100,"Hi btn2");

    btn1.build($placeholder);
    btn2.build($placeholder);
});

