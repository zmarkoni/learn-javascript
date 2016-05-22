;
define(function(){

    var screen = function(){};

    screen.prototype = {

        smallWidth: 803,

        mediumWith: 1280,

        isLarge: function()
        {
            return $(window).width() >= this.mediumWith;
        },

        isMedium: function()
        {
            return this.smallWidth <= $(window).width() &&
                $(window).width() < this.mediumWith;
        },

        isSmall: function()
        {
            return $(window).width() < this.smallWidth;
        },

        isLandscape: function(){
            return $(window).width() > $(window).height();
        },

        getContentHeight: function()
        {
            return $(window).height() - $("header").outerHeight();
        },

        getMessageConversationHeight: function()
        {
            if($("#messages_body_container").length > 0){
                return $(window).height() - $(".navigation_desktop").outerHeight() - $("#messages_body_container").offset().top - $("#messages_body_container .js_messages_user_info").outerHeight() - $('.notification_wrap').outerHeight() - $(".send_message_form").outerHeight() - 10;
            }
            return 0;
        },

        getBodyContainerHeight: function ()
        {
            return this.getWindowHeight() - $("#js_body_container").offset().top;
        },

        getPageContentHeight: function()
        {
            return $(window).height() - $("header").outerHeight() - $(".mobile_header").outerHeight();
        },

        getWindowHeight: function()
        {
            return $(window).height();
        },

        getProfilePictureHeight: function()
        {
            return this.getWindowHeight() - $("#profile_picture").offset().top - $("#responsive_profile_buttons a.button").outerHeight();
        }
    };

    return new screen();
});