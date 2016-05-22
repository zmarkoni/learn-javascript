;
define([
    'sandbox',
    'evento'
], function(
    Sandbox,
    Evento
){

    var Snapper = function(){

        this.containerSelector = '#js_mobile_menu';
        this.hamburgerSelector = '.js_snapper';
        Evento.on('PAGE_CHANGED', $.proxy(this.close, this));
        Sandbox.el('body').off("click", this.hamburgerSelector).on("click", this.hamburgerSelector, this.onHamburgerClick.bind(this));
    };

    Snapper.prototype = {

        close: function()
        {
            Sandbox.el('body').off('click', this.onBodyClick.bind(this));
            Sandbox.el(this.containerSelector).hide();
        },

        onHamburgerClick: function(event)
        {
            event.stopPropagation();
            this.isVisible() ? this.close() : this.open();
        },

        onBodyClick: function(event)
        {
            event.stopPropagation();
            if ($(event.target).parents(this.containerSelector).length === 0) {
                this.close();
            }
        },

        open: function()
        {
            Sandbox.el(this.containerSelector).removeClass('hide').show();
            Sandbox.el('body').on('click', this.onBodyClick.bind(this));
        },

        isVisible: function()
        {
            return Sandbox.el(this.containerSelector).is(":visible");
        }

    };

    return Snapper;
});