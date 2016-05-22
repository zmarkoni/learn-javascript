;
define([
    "sandbox"
], function(
    Sandbox
){

    var SectionsChanger = function(selector)
    {
        this.selector = selector;

        Sandbox.el('body').off('click', this.selector, this.onClick.bind(this));
        Sandbox.el('body').on('click', this.selector, this.onClick.bind(this));
    }

    SectionsChanger.prototype = {

        onClick: function(event)
        {
            Sandbox.el('.js_toggle_section').removeClass('active');
            Sandbox.el(event.currentTarget).addClass('active');

            var elSelector =  Sandbox.el(event.currentTarget).data('section-show');
            Sandbox.el('.js_section_changer').addClass('hide');
            Sandbox.el(elSelector).removeClass('hide');
        }
    };

    return SectionsChanger;
});