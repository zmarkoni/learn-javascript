;
define(["typeahead"], function(){

    var cityTypeahead = function(formFields){
        this.formFields = formFields;

        this.destroy();
        this.typeahead();

        this.getCity().off('typeahead:selected');
        this.getCity().off('typeahead:opened');
        this.getCity().off('typeahead:closed');

        this.getCity().on('typeahead:selected', $.proxy(this.selected, this, this.getCity()));
        this.getCity().on('typeahead:opened', $.proxy(this.opened));
        this.getCity().on('typeahead:closed', $.proxy(this.closed, this, this.getCity()));
    };

    cityTypeahead.prototype = {

        currentCityValue:null,

        usCountryId: 228,

        closed: function (cityField)
        {
            if ($(cityField).val() != this.currentCityValue) {
                this.getCityId().val('');
            }
        },

        destroy: function()
        {
            this.getCity().typeahead('destroy');
            return this;
        },

        getCity: function()
        {
            return $(this.formFields.cityField);
        },

        getCityId: function()
        {
            return $(this.formFields.cityIdField);
        },

        getCountryValue: function()
        {
            return $(this.formFields.countryField).val();
        },

        getStateValue: function()
        {
            return $(this.formFields.stateField).val() ? $(this.formFields.stateField).val() : 0;
        },

        getStateQuery: function()
        {
            return this.getCountryValue()  == this.usCountryId && this.getStateValue() > 0 ? '&state_id=' + this.getStateValue() : '';
        },

        opened: function ()
        {
            this.currentCityValue = $(this).val();
        },

        selected: function (cityField, datum, dataset)
        {
            this.getCityId().val(dataset.city_id);
            this.currentCityValue = $(cityField).val();
            $(cityField).blur();
        },

        typeahead: function()
        {
            var cities = new Bloodhound({
                datumTokenizer: function(d) {
                    return Bloodhound.tokenizers.whitespace(d.city_id);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: '/api/cities?country_id=' + this.getCountryValue() + this.getStateQuery(),
                remote: '/api/cities?country_id=' + this.getCountryValue() + this.getStateQuery() + "&term=%QUERY",
                limit:10
            });

            cities.initialize();

            this.getCity().typeahead(null, {
                displayKey: 'city_name',
                source: cities.ttAdapter()
            });
        }
    };

    return cityTypeahead;

});