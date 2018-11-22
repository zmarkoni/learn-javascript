//https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch6.md
//OLOO style
// var Foo = {
//     init: function(who) {
//         this.me = who;
//     },
//     identify: function () {
//         return "I am " + this.me;
//     }
// };
//
// var Bar = Object.create(Foo);
//
// Bar.speak = function () {
//     alert("Hello, " + this.identify() + ".");
// };
//
// var b1 = Object.create(Bar);
// b1.init("b1-zoki");
// b1.speak();
// console.log('zzz: ' + b1.identify());

//Widget with OLOO style
// var Widget = {
// 	init: function(width,height){
// 		this.width = width || 50;
// 		this.height = height || 50;
// 		this.$elem = null;
// 	},
// 	insert: function($where){
// 		if (this.$elem) {
// 			this.$elem.css( {
// 				width: this.width + "px",
// 				height: this.height + "px"
// 			} ).appendTo( $where );
// 		}
// 	}
// };
//
// var Button = Object.create( Widget );
//
// Button.setup = function(width,height,label){
// 	// delegated call
// 	this.init( width, height );
// 	this.label = label || "Default";
//
// 	this.$elem = $( "<button>" ).text( this.label );
// };
// Button.build = function($where) {
// 	// delegated call
// 	this.insert( $where );
// 	this.$elem.click( this.onClick.bind( this ) );
// };
// Button.onClick = function(evt) {
// 	console.log( "Button '" + this.label + "' clicked!" );
// };

// $( document ).ready( function(){
// 	var $body = $( document.body );
//
// 	var btn1 = Object.create( Button );
// 	btn1.setup( 125, 30, "Hello" );
//
// 	var btn2 = Object.create( Button );
// 	btn2.setup( 150, 40, "World" );
//
// 	btn1.build( $body );
// 	btn2.build( $body );
// } );

// Widget ES6 CLASS example
class Widget {
    constructor(width, height) { // init
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }

    render($where) { //insert
        if(this.$elem) {
            this.$elem.css( {
                width: this.width + "px",
                height: this.height + "px"
            } ).appendTo( $where );
        }
    }
}

class Button extends Widget {
    constructor(width, height, label) { //setup
        super(width,height);
        this.label = label || "Default";
        this.$elem = $('<button>').text(this.label);
    }

    render($where) { //build
        super.render($where); // call widget.render
        this.$elem.click( this.onClick.bind( this ) );
    }

    onClick(evt) {
        console.log( "Button '" + this.label + "' clicked!" );
    }
}

$( document ).ready( function(){
	var $body = $( document.body );

	var btn1 = new Button( 125, 30, "Hello class" );
	var btn2 = new Button( 150, 40, "World class" );

	btn1.render( $body );
	btn2.render( $body );
} );
