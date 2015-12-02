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

// ==== OBJECT LITERAL PATTERN ======================================

    var people = { //GLOBAL
        people: ["Zoran", "Jelena"],
        //all methods and variables are public
        init:function() {
            this.cashDom();
            this.bindEvents();
            this.render();
        },
        cashDom: function() {
            this.$el = $('#peopleModule');
            this.$button = this.$el.find('button');
            this.$input = this.$el.find('input');
            this.$ul = this.$el.find('ul');
            this.template = this.$el.find('#people-template').html();
        },
        bindEvents: function() {
            this.$button.on('click', this.addPerson.bind(this));  //bind(this) mora kako bih prosledio people kontekst
            this.$ul.delegate('i.del', 'click', this.deletePerson.bind(this));

        },
        render: function() {
            var data = {
                people: this.people,
            };
            this.$ul.html(Mustache.render(this.template, data));
        },
        addPerson:function(){
            this.people.push(this.$input.val());
            this.render();
            this.$input.val('');
        },
        deletePerson:function(event) {
            //find where is the current X is in the list and remove that number form the people list
            var $remove = $(event.target).closest('li'); //find clicked element, jQuery $(event.target)
            var i = this.$ul.find('li').index($remove);  // jQuery index()
            this.people.splice(i,1);
            this.render();
       }

    };

    people.init();


