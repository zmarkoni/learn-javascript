;
define([
    "sandbox/pages/pages",
    "pjax",
    "evento"
], function(
    Pages,
    pjax,
    Evento
) {

    var Navigation = function(config)
    {
        this.config = config;

        this.addClassOnBodyContainer();

        var page = this.getPageObject()
        if(page){
            page.run();
        }

        $.pjax.defaults.timeout = this.config.faildTimeout;

        $('body').on('click', 'a.pjax', this.onClick.bind(this));
        $(document).on('pjax:send',       this.onSend.bind(this));
        $(document).on('pjax:success',    this.onSuccess.bind(this));
        $(document).on('pjax:complete',   this.onComplete.bind(this));
        $(document).on('pjax:popstate',   this.onPopstate.bind(this));
        $(document).on('pjax:end',        this.onEnd.bind(this));
        $('body').on('click','.js_back',  this.back.bind(this));
        Evento.on('PAGE|RELOAD',          this.reload.bind(this));
        Evento.on('PAGE|BACK',            this.back.bind(this));
        Evento.on('PAGE|GO|TO',           this.goTo.bind(this));
        this.setActiveInNavigation();
        Evento.trigger('resize');
    };

    Navigation.prototype = {

        previousPage: null,

        history: [],

        addClassOnBodyContainer: function()
        {
            var controllerName = location.pathname.match(/\/([^\/]+)/)[1];

            var className = "pg" + controllerName.charAt(0).toUpperCase() + controllerName.slice(1);
            var baseClassName = "pg_base_" + controllerName.replace(/-/g, "_");
            var fullClassName = "pg_full" +location.pathname.replace(/\//g, "_").replace(/-/g, "_");

            $(this.config.atachStateSelector).attr("class", $(this.config.atachStateSelector).attr("class").replace(/(\s|^)pg[^\s]+/g, ''));

            $(this.config.atachStateSelector).addClass(className);
            $(this.config.atachStateSelector).addClass(baseClassName);
            $(this.config.atachStateSelector).addClass(fullClassName);

            this.removeClasses();
            $('body').addClass('body_'+fullClassName);

            this.history.push(location.pathname + window.location.hash);
        },

        back: function()
        {
            var lastPage = this.history.pop();
            lastPage = this.history.pop();
            if(lastPage == undefined){
                lastPage = '/search';
            }
            this.removeActiveFromNavigation();
            $.pjax({url: lastPage, container: this.config.contentSelector});
        },

        onEnd: function()
        {
            this.previousPage = location.pathname;
        },

        getPageObject: function(pathname)
        {
            return new Pages().getPage(this.getObjectNameFromPathname(pathname));
        },

        getObjectNameFromPathname: function(pathname)
        {
            if (pathname == undefined) {
                pathname = location.pathname;
            }
            return pathname.replace(/^\//, "").toLowerCase().replace(/(\/|-)(.)/g, function(match, group1, group2) {
                return group2.toUpperCase();
            });
        },

        onClick: function(event)
        {
            if ($(event.currentTarget).attr("href") != location.pathname + location.search) {
                this.removeActiveFromNavigation();
                var page = this.getPageObject();
                if(page){
                    page.clean();
                }
                $.pjax.click(event, this.config.contentSelector);
            }

            if(this.config.onClick != undefined){
                this.config.onClick();
            }
            $('.js_modal').remove();
            return false;
        },

        onComplete: function()
        {
            this.addClassOnBodyContainer();
            var page = this.getPageObject()
            if(page){
                page.run();
            }
            this.setActiveInNavigation();
            if(this.config.onComplete != undefined){
                this.config.onComplete();
            }
            Evento.trigger('PAGE_CHANGED');
        },

        onPopstate: function()
        {
            var prevPage = this.getPageObject(this.previousPage);
            if(prevPage){
                prevPage.clean();
            }

            var page = this.getPageObject()
            if(page){
                page.run();
            }

            this.removeActiveFromNavigation();
            this.setActiveInNavigation();
            this.addClassOnBodyContainer();
            if(this.config.onPopstate != undefined){
                this.config.onPopstate();
            }
            Evento.trigger('PAGE_CHANGED');
        },

        onSend: function()
        {
            if(this.config.onSend != undefined){
                this.config.onSend();
            }
        },

        onSuccess: function()
        {
            ga('set', 'location', window.location.href);
            ga('send', 'pageview');
            if(this.config.onSuccess != undefined){
                this.config.onSuccess();
            }
        },

        removeActiveFromNavigation: function()
        {
            $("li", $(this.config.navigationsSelector)).removeClass("active");
            $(".js_header_links a").removeClass('active');
            $('a.pjax').removeClass('active');
            $('a.pjax').parent('li').removeClass('active');
        },

        removeClasses: function()
        {
            var classAttr = $('body').attr('class');
            if(classAttr == undefined){
                return false;
            }
            var classList = classAttr.split(/\s+/);
            $.each(classList, function(index, item) {
                if(item.indexOf('body_pg') >= 0){
                    $('body').removeClass(item);
                }
            });
        },

        reload: function(data){
            $.pjax({url: location.pathname, container: this.config.contentSelector});
        },

        goTo: function(url)
        {
            $.pjax({url: url, container: this.config.contentSelector});
        },

        setActiveInNavigation: function()
        {
            $(".js_header_links a[href=\""+location.pathname+"\"]").addClass('active');
            $("li a." + this.getObjectNameFromPathname(), $(this.config.navigationsSelector)).parent().addClass("active");
        }
    }

    return Navigation;
});
