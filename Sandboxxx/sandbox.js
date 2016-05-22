;
define([
    "evento",
    "sandbox/navigation",
    'sandbox/template',
    "sandbox/screen",
    "sandbox/pages/pages",
    "sandbox/pages/current-page",
    "sandbox/pages/routes",
    "sandbox/progress"
],
function(
    Evento,
    Navigation,
    Template,
    Screen,
    Pages,
    CurrentPage,
    Routes,
    Progress
){

    var Sandbox = {

        currentPage: function()
        {
            return new CurrentPage();
        },

        el:function(selector)
        {
            return $(selector);
        },

        getHash: function()
        {
            var url = window.location.href;
            return url.substring(url.indexOf('#')).replace("#", "")
        },

        getFormData: function(selector)
        {
            var data = {};
            $(selector).serializeArray().map(function(x){data[x.name] = x.value;});
            return data;
        },

        getFormType: function()
        {
            return $('#js_form_wrapper').data('type');
        },

        getUrlParams: function()
        {
            var search = location.search.substring(1);
            if(search.length < 1){
                return {};
            }
            return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        },

        getFormNature: function()
        {
            return $('#js_form_wrapper').data('nature');
        },

        template: function(Html, data, context, action)
        {
            return new Template(Html, data, context, action);
        },

        navigation: function(config)
        {
            return new Navigation(config);
        },

        parentIFrame: function()
        {
            return window.parentIFrame;
        },

        pageReload: function()
        {
            Evento.trigger('PAGE|RELOAD');
        },

        pages: function()
        {
            return new Pages();
        },

        routes: function()
        {
            return Routes;
        },

        screen: function()
        {
            return Screen;
        },
        
        scrollTo: function(selector)
        {
            var s = $(selector);
            s.animate({ scrollTop: s.prop('scrollHeight') }, 1000);
        },

        progress: function(element)
        {
            return new Progress(element);
        }

    };

    return Sandbox;

});