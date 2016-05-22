;
define([
    "photoswipe",
    "photoswipe_ui",
    "text!templates/front/photos/swipe.twig"
],
function(
    PhotoSwipe,
    PhotoSwipeUI_Default,
    template
){

    var photoswipe = function(){

        document.getElementById('photoswipe').innerHTML = template;

        this.pswpElement = document.querySelectorAll('#photoswipe .pswp')[0];

        this.options = {
            index       : 0,
            history     : false,
            closeEl     : true,
            captionEl   : false,
            fullscreenEl: false,
            zoomEl      : false,
            shareEl     : false,
            counterEl   : true,
            arrowEl     : false,
            preloaderEl : true,
        };
    };

    photoswipe.prototype = {

        init: function(items)
        {
            if (items.length > 0) {
                new PhotoSwipe(this.pswpElement, PhotoSwipeUI_Default, items, this.options).init();
            }
        },
    };

    return photoswipe;

});