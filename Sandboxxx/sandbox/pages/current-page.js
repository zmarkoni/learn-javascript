;
define([
    "http",
    "evento"
],function(
    Http,
    Evento
){

    var CurrentPage = function(){};

    CurrentPage.prototype = {

        isIt: function(page)
        {
            return location.pathname == page;
        },

        isItSearch: function()
        {
            return this.isIt("/search") ||  this.isIt("/search/index")
        },

        isConversation:function()
        {
            return location.pathname.indexOf("/messages/conversations") > -1;
        },

        getId: function(page){
            var params =  page.split("id=");
            return params[1];
        },

        getPageNumber: function()
        {
            var match = RegExp('[?&]page=([^&]*)').exec(window.location.search);
            var page = match && decodeURIComponent(match[1].replace(/\+/g, ' '));
            return page == null ?
                1 :
                parseInt(page);
        },

        pageReload: function()
        {
            Evento.trigger('PAGE|RELOAD');
        },

        referesh: function()
        {
            new Http({
                url:window.location.href,
                dataType:"html"
            }).success(this.onLoad.bind(this));
        },

        onLoad: function(data)
        {
            $("#js_body_content").html(data);
        }
    };

    return CurrentPage;

});