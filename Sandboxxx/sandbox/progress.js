;
define([
        "nprogress"
    ],
    function(
        NProgress
    ){

        var Progress = function (element) {
            element = element || "body";
            this.nProgress = NProgress.configure({
                parent: element,
                showSpinner: false
            });
        };

        Progress.prototype = {

            start: function()
            {
                if (this.nProgress.start !== undefined) {
                    this.nProgress.start();
                }
            },

            stop: function()
            {
                if (this.nProgress.done !== undefined) {
                    this.nProgress.done();
                }
            }
        };

        return Progress;
    });