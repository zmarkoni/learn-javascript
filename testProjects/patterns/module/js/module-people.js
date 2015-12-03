// ==== JS ground rules ======================================
/*
- self-conteined module
  - everything to do with my module is in my module
  - no global variables
  - if a module manage more than one thing, it should be split
- separation of concerns
- DRY code: Don't repeat yoursef
- efficient DOM usage
  - very few $(selections)
- no memory leaks
  - all events can be unbound
  */
// ==== MODUL REVEALING PATTERN ======================================


var people = (function() { //sad je sve privatno, ako sklonim ovu funkciju, people ce postati globalna varijabla

    var people = ["Zoran", "Jelena"];

    //cash DOM
    var $el = $('#peopleModule');
    var $button = $el.find('button');
    var $input = $el.find('input');
    var $ul = $el.find('ul');
    var template = $el.find('#people-template').html();

    //bindEvents
    $button.on('click', addPerson);
    $ul.delegate('i.del', 'click', deletePerson);

    _render(); // donja crta znaci da je metod privatan

    function _render(){
        $ul.html(Mustache.render(template, {people:people}));
        //stats.setPeople(people.length);
        events.emit('peopleChanged', people.length);
    }

    function addPerson(value){ //value from click event
        var name = (typeof value === "string") ? value : $input.val();
        people.push(name);
        _render();
        $input.val('');
    }

    function deletePerson(event){
        var i;
        if(typeof event === "number"){
            i = event;
        } else {
            var $remove = $(event.target).closest('li');
            i = $ul.find('li').index($remove);
        }
        people.splice(i,1);
        _render();
    }

    return {
        addPerson: addPerson,
        deletePerson: deletePerson
    }
})();
