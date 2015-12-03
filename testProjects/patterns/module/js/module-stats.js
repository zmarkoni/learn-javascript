// ==== MODUL REVEALING PATTERN ======================================

var stats = (function(){
    var people = 0;

    //cash DOM
    var $stats = $('#statsModule');
    var $statsHolder = $('#statsHolder');
    var template = $('#stats-template').html();

    //bind events
    events.on('peopleChanged', setPeople);

    function render() {
        $statsHolder.html(Mustache.render(template, {people:people}));
    };

    function setPeople(newPeople){
        people = newPeople;
        render();
    };

    function destroy() {
        $stats.remove();
        events.off('peopleChanged', setPeople);
    };

    // return {
    //     setPeople: setPeople
    // };

})();