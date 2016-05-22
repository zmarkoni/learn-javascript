;
define(["twig"], function(Twig){

    var Template = function(Html, data, context){

        Twig.extend(this.extendTransTag.bind(this));

        var template = Twig.twig({
            data: Html,
            allowInlineIncludes: true,
            url: '//' + location.hostname,
            base: '/templates'
        });

        switch(data.inject_method) {
            case 'html':
                $(context).html(template.render(data));
                break;
            case 'append':
                $(context).append(template.render(data));
                break;
            default:
                $(context).html(template.render(data));
        }
    };

    Template.prototype = {

        extendTransTag: function(Twig)
        {
            Twig.exports.extendTag({
                type: "trans",
                regex: /^trans\s+(.+)$/,
                next: [ ],
                open: true,
                compile: function (token) {
                    var expression = token.match[1];
                    token.stack = Twig.expression.compile.apply(this, [{
                        type:  Twig.expression.type.expression,
                        value: expression
                    }]).stack;

                    delete token.match;
                    return token;
                },

                parse: function (token, context, chain) {
                    var output = token.stack[0] == undefined ?
                        '' :
                        token.stack[0].value;
                    return {
                        chain: false,
                        output: output
                    };
                }
            });
        }

    };

    return Template;
});