//================= Events ==============================
/*
addEventListener
removeEventListener

stopPropagation();
preventDefault();

bubbling, capturing
*/

//example
document.getElementById('el').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
}, false);//false znaci bubble odozdo na gore, true je capture odozgo na


//================= Event Listeners =====================

//The simplest example, which will just pop out an alert message when an element is clicked, is as follows:

element.addEventListener("click", function() {
    alert("You clicked");
}, false);


//To achieve this same functionality on all of the elements on a given page,
//we have to loop through each element, and give them all eventListeners:

var links = document.querySelectorAll("a");
// For each link element
[].forEach.call(links, function (el) {
    el.addEventListener("click", function (event) {
        event.preventDefault;
        alert("You clicked");
    }, false);
});

//==============!important
//One of JavaScript’s greatest features related to event listeners is the fact that "addEventListener" can
//take an object as a second argument that will automatically look for a method called "handleEvent" and call it
//read more on : http://www.thecssninja.com/javascript/handleevent
var object = {
    init: function () {
        var button = document.getElementById("btn");
        button.addEventListener("click", this, false);
        button.addEventListener("touchstart", this, false);
    },
    handleEvent: function (e) {
        switch (e.type) {
            case "click":
                this.action();
                break;
            case "touchstart":
                this.action();
                break;
        }
    },
    action: function () {
        alert("Clicked or touched!");
    }
};

// Init
object.init();