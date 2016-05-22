;
define([
        "sandbox",
        "extensions/city-typeahead",
        "http",
        "text!templates/front/partials/states.twig"],
    function(Sandbox, CityTypeahead, Http, HtmlStates){

        var Location = function(){

        };

        Location.prototype = {

            addText: function(data)
            {
                var text = data.city;
                if(data.state_name != undefined && data.state_name.length > 0){
                    text += ", " + data.state_name;
                }
                text += ", " + data.country_name;
                Sandbox.el("#js_location_text").html(text);
            },

            change: function(event)
            {
                $(event.currentTarget).attr("name") == "country" ?
                    this.resetState():
                    this.resetCity();
            },

            show: function(){
                Sandbox.el(".js_location_show").hide();
                Sandbox.el(".js_location_wrapper").show();
            },

            cityTypeahead: function()
            {
                Sandbox.el('.js_form_error.js_wrong_city').hide();
                var countryId = Sandbox.el('.js_location_wrapper select[name="country"]').val();
                if( countryId == "" || countryId == null){
                    return false;
                }

                new CityTypeahead({
                    cityIdField:'.js_location_wrapper input[name="city_id"]',
                    cityField:'.js_location_wrapper input[name="city"]',
                    countryField:'.js_location_wrapper select[name="country"]',
                    stateField:'.js_location_wrapper select[name="state"]'
                });
            },

            resetState: function()
            {
                this.getSelectedCountryCode() == 'US' ?
                    this.loadStates():
                    Sandbox.el(".js_location_wrapper .js_state_container").hide();

                Sandbox.el(".js_location_wrapper select[name=\"state\"]").val('');
                this.resetCity();
            },

            loadStates: function()
            {
                new Http({
                    url:'/api/states',
                    data:{country_code:this.getSelectedCountryCode()}
                }).success($.proxy(this.onStatesLoad, this));
            },

            onStatesLoad: function(data){
                var selectStateOptEl = Sandbox.el('.js_select_state_opt');
                if(data.code == 200){
                    Sandbox.template(HtmlStates,{response:{states:data.response}},Sandbox.el('.js_state_list'));
                    Sandbox.el('.js_state_list').prepend(selectStateOptEl);
                    Sandbox.el(".js_location_wrapper .js_state_container").show();
                    Sandbox.el('.js_state_list').focus();
                }
            },

            resetCity: function()
            {
                this.clearCityInputs();
                this.cityTypeahead();
            },

            getSelectedCountryCode: function()
            {
                return Sandbox.el(".js_location_wrapper select[name=\"country\"]").find('option:selected').data('code');
            },

            run: function()
            {
                this.disableEventListeners();
                this.enableEventListeners();
                this.cityTypeahead();
            },

            disableEventListeners: function()
            {
                Sandbox.el('body').off('click', '.js_location_show');
                Sandbox.el('body').off('change', '.js_location_wrapper select');
                Sandbox.el('body').off('blur', 'input.js_location_city');
            },

            enableEventListeners: function()
            {
                Sandbox.el('body').on('click', '.js_location_show', $.proxy(this.show, this));
                Sandbox.el('body').on('change', '.js_location_wrapper select', $.proxy(this.change, this));
                Sandbox.el('body').on('blur', 'input.js_location_city', $.proxy(this.onLocationCityBlur, this));
            },

            onLocationCityBlur : function(event)
            {
                Sandbox.el('.js_form_error.js_wrong_city').hide();
                if( Sandbox.el('.tt-suggestion.tt-cursor').length !== 0 ){
                    return false;
                }
                var city = Sandbox.el('#location');
                if(city.val() !== city.attr('value')){
                    this.clearCityInputs();
                    Sandbox.el('.js_form_error.js_wrong_city').show();
                }
            },

            clearCityInputs: function()
            {
                Sandbox.el('.js_location_wrapper input[name="city"]').val("");
                Sandbox.el('.js_location_wrapper input[name="city_id"]').val("");
            }

        };

        return Location;

    });