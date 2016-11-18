
//  IV  OBSERVER PATTERN

//One or more observers are interested in the state of a subject and register their interest with the subject by attaching themselves. When something changes in our subject that the observer may be interested in, a notify message is sent which calls the update method in each observer. When the observer is no longer interested in the subject's state, they can simply detach themselves.

//We can now expand on what we've learned to implement the Observer pattern with the following components:
    // 1. Subject: maintains a list of observers, facilitates adding or removing observers
    // 2. Observer: provides a update interface for objects that need to be notified of a Subject's changes of state
    // 3. ConcreteSubject: broadcasts notifications to observers on changes of state, stores the state of ConcreteObservers
    // 4. ConcreteObserver: stores a reference to the ConcreteSubject, implements an update interface for the Observer to ensure state is consistent with the Subject's

//First, let's model the list of dependent Observers a subject may have:

function ObserverList() { //konstruktor
    this.observerList = [];
}

ObserverList.prototype.add = function(obj){
    return this.observerList.push(obj);
};

ObserverList.prototype.count = function(){
    return this.observerList.length;
};

ObserverList.prototype.get = function(){
    if( index > -1 && index < this.observerList.length ){
        return this.observerList[index];
    }
};

ObserverList.prototype.indexOf = function(obj, startIndex){
    var i = startIndex;
    while( i < this.observerList.length ) {
        if(this.observerList[i] === obj) {
            return i;
        }
        i++;
    }
    return -1;
};

ObserverList.prototype.removeAt = function( index ){
    this.observerList.splice( index, 1 );
};

//Next, let's model the SUBJECT and the ability to add, remove or notify observers on the observer list.

function Subject(){
  this.observers = new ObserverList(); //NASLEDJUJE SVE METODE
}

Subject.prototype.addObserver = function( observer ){
  this.observers.add( observer );
};

Subject.prototype.removeObserver = function( observer ){
  this.observers.removeAt( this.observers.indexOf( observer, 0) ); // 0 is startIndex
};

Subject.prototype.notify = function( context ){
  var observerCount = this.observers.count();
  for(var i=0; i < observerCount; i++){
    this.observers.get(i).update( context );
  }
};

//We then define a skeleton for creating new Observers. The update functionality here will be overwritten later with custom behaviour.

// The OBSERVER
function Observer(){
  this.update = function(){
    // ... The update functionality here will be overwritten later with custom behaviour.
  };
}

/* In our sample application using the above Observer components, we now define:

    A button for adding new observable checkboxes to the page
    A control checkbox which will act as a subject, notifying other checkboxes they should be checked
    A container for the new checkboxes being added
    We then define ConcreteSubject and ConcreteObserver handlers for both adding new observers to the page and implementing the updating interface. See below for inline comments on what these components do in the context of our example.

<button id="addNewObserver">Add New Observer checkbox</button>
<input id="mainCheckbox" type="checkbox"/>
<div id="observersContainer"></div>
*/

// Extend an object with an extension
function extend( obj, extension ){
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}

// Concrete Observer

// References to our DOM elements

var controlCheckbox = document.getElementById( "mainCheckbox" ),
    addBtn = document.getElementById( "addNewObserver" ),
    container = document.getElementById( "observersContainer" );


function addNewObserver(){ //prvo ove udje, pa onda prati u ispektoru

  // Create a new checkbox to be added
  var check = document.createElement( "input" );
  check.type = "checkbox";

  // Extend the checkbox with the Observer class
  extend( check, new Observer() );

  // Override with custom update behaviour
  check.update = function( value ){
    this.checked = value;
  };

  // Add the new observer to our list of observers
  // for our main subject
  controlCheckbox.addObserver( check ); // check je input

  // Append the item to the container
  container.appendChild( check );
}

//Odavde krece izvrsavanje

// Concrete Subject
// Extend the controlling checkbox with the Subject class
extend( controlCheckbox, new Subject() );

// Clicking the checkbox will trigger notifications to its observers
controlCheckbox.onclick = function(){
  controlCheckbox.notify( controlCheckbox.checked );
};

addBtn.onclick = addNewObserver;


