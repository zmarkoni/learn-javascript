;
define([
    "sandbox",
    "evento",
    "http",
    "./modals"
], function(
    Sandbox,
    Evento,
    Http,
    Modals
){

    var Runner =  function() {
        Sandbox.el('body').off('click', '.js_modal_link').on('click', '.js_modal_link', this.onClick.bind(this));
        Sandbox.el('body').off('click', '.js_modal_close').on('click', '.js_modal_close', this.close.bind(this));
        Sandbox.el('body').off('click', '#js_modal').on('click', '#js_modal', this.onClickOverlay.bind(this));
        Evento.on('MODAL|CLOSE', this.close.bind(this))
    };

    Runner.prototype = {

        add:function(key, data)
        {
            Modals[key] = data;
        },

        close: function()
        {
            Sandbox.el('#js_modal_container').html("");
            this.disableEsc();
        },

        disableEsc: function()
        {
            Sandbox.el('body').off('keyup', this.onEsc.bind(this));
        },

        enableEsc: function()
        {
            Sandbox.el('body').off('keyup', this.onEsc.bind(this)).on('keyup', this.onEsc.bind(this));
        },

        large: function(event)
        {
            var modal = Modals[Sandbox.el(event.currentTarget).data('modal')];
            new Http({
                url:modal.url,
            }).success(this.onLoadModal.bind(this, modal));
        },

        onClick: function(event)
        {
            event.preventDefault();
            Sandbox.screen().isSmall()?
                this.small(event):
                this.large(event);
            this.enableEsc();
        },

        onEsc: function(event)
        {
            if ( event.which == 27 ) {
                this.close();
            }
        },

        onClickOverlay: function(event)
        {
            if ( Sandbox.el(event.target).is("#js_modal") ) {
                this.close();
            }
        },

        onLoadModal: function(modal, data)
        {
            Sandbox.template(
                modal.template,
                data,
                Sandbox.el('#js_modal_container')
            );

            if(modal.callback != undefined){
                modal.callback.call(modal, data);
            }
        },

        small: function(event)
        {
            Evento.trigger("PAGE|GO|TO",Sandbox.el(event.currentTarget).data("href"));
        }

    };

    return Runner;
});
