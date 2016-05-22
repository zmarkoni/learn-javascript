;
define(["./routes"
], function(Routes) {

    var Pages  = function(){
        this.pages = Routes;
    };

    Pages.prototype = {

        pages:{},

        getPage:function(page)
        {
            if(this.pages[page] != undefined){
                return new this.pages[page]();
            }
            return false;
        },

        reloadPage: function(page, pageNumber)
        {
            if(page != undefined){
                if(pageNumber != undefined && pageNumber > 1){
                    page += '?page='+pageNumber;
                }
                $.pjax({url: page, container: '#js_body_content'});
            }
        },

        getPageNumber: function()
        {
            var match = RegExp('[?&]page=([^&]*)').exec(window.location.search);
            var page = match && decodeURIComponent(match[1].replace(/\+/g, ' '));
            return page == null ?
                1 :
                parseInt(page);
        },

        is:function(url)
        {
            return window.location.href.indexOf(url) > 1;
        }

    };

    return Pages;
});