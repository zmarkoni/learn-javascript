;
define([
    'extensions/city-typeahead',
    "rangeSlider",
    "extensions/snapper",
    "extensions/photoswipe",
    "extensions/modal/runner",
    "extensions/sections-changer",
    "extensions/location",
    "extensions/upload"
], function(
    cityTypeaHead,
    RangeSlider,
    Snapper,
    Photoswipe,
    Modal,
    SectionsChanger,
    Location,
    Upload
){

    var Extensions = {

        cityTypeaHead: function(params)
        {
            return new cityTypeaHead(params);
        },

        slider: function(element, options){
            $(element).ionRangeSlider(options);
        },

        snapper: function()
        {
            return new Snapper();
        },

        photoswipe: function()
        {
            return new Photoswipe()
        },

        modal: function()
        {
            return new Modal();
        },

        sectionsChanger: function(selector)
        {
            return new SectionsChanger(selector);
        },

        location: function()
        {
            return new Location();
        },

        upload: function(options)
        {
            return new Upload(options);
        }

    };

    return Extensions;

});