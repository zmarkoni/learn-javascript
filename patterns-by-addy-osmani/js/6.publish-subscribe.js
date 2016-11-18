//  VI  PUBLISH/SUBSCRIBE PATTERN

/*
The Observer pattern requires that the observer (or object) wishing to receive topic
notifications must subscribe this interest to the object firing the event (the subject).

The Publish/Subscribe pattern however uses a topic/event channel which sits between the
objects wishing to receive notifications (subscribers) and the object firing the event
(the publisher). This event system allows code to define application specific events
which can pass custom arguments containing values needed by the subscriber.
The idea here is to avoid dependencies between the subscriber and publisher.

This differs from the Observer pattern as it allows any subscriber implementing an
appropriate event handler to register for and receive topic notifications broadcast
by the publisher.
*/

// A very simple new mail handler

// A count of the number of messages received
var mailCounter = 0;

// Initialize subscribers that will listen out for a topic
// with the name "inbox/newMessage".

// Render a preview of new messages
var subscriber1 = subscribe( "inbox/newMessage", function( topic, data ) {

  // Log the topic for debugging purposes
  console.log( "A new message was received: ", topic );

  // Use the data that was passed from our subject
  // to display a message preview to the user
  $( ".messageSender" ).html( data.sender );
  $( ".messagePreview" ).html( data.body );

});

// Here's another subscriber using the same data to perform
// a different task.

// Update the counter displaying the number of new
// messages received via the publisher

var subscriber2 = subscribe( "inbox/newMessage", function( topic, data ) {

  $('.newMessageCounter').html( ++mailCounter );

});

publish( "inbox/newMessage", [{
  sender: "hello@google.com",
  body: "Hey there! How are you doing today?"
}]);

// We could then at a later point unsubscribe our subscribers
// from receiving any new topic notifications as follows:
// unsubscribe( subscriber1 );
// unsubscribe( subscriber2 );


//The general idea here is the promotion of loose coupling. Rather than single objects
//calling on the methods of other objects directly, they instead subscribe to a specific
//task or activity of another object and are notified when it occurs.

//  Publish/Subscribe Implementations

//jQuery

// Publish
// jQuery: $(obj).trigger("channel", [arg1, arg2, arg3]);
//$( el ).trigger( "/login", [{username:"test", userData:"test"}] );

// Subscribe
// jQuery: $(obj).on( "channel", [data], fn );
//$( el ).on( "/login", function( event ){...} );

// Unsubscribe
// jQuery: $(obj).off( "channel" );
//$( el ).off( "/login" );



















