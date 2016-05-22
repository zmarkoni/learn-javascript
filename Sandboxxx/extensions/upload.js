;
define([
        "sandbox",
        "jquery.fileupload"
    ],
    function(
        Sandbox,
        jqueryFileUpload
    ){

        var Upload = function(options){

            this.url = options.url;
            this.selector = options.selector;
            return this;

        };

        Upload.prototype = {

            url: null,

            selector: null,

            filesUploadCount : 0,

            tryToDestroyUpload: function()
            {
                try{
                    Sandbox.el(this.selector).fileupload('destroy');
                }
                catch(err) {}
            },

            setUpload: function()
            {
                Sandbox.el(this.selector).fileupload({
                    url: this.url,
                    dataType: 'json',
                    maxNumberOfFiles: 1,
                    singleFileUploads: true,
                    sequentialUploads: true,
                    start: this.onStart,
                    submit: this.onSubmit.bind(this),
                    done: this.onSuccess,
                    fail: this.onError
                });
            },

            start: function(callback)
            {
                this.onStart = callback;
                return this;
            },

            onSubmit: function()
            {
                this.filesUploadCount += 1;
                return this.filesUploadCount === 1;
            },

            success: function(callback)
            {
                this.onSuccess = callback;
                return this;
            },

            error: function(callback)
            {
                this.onError = callback;
                return this;
            },

            run: function()
            {
                this.tryToDestroyUpload();
                this.setUpload();
            }

        };

        return Upload;
    });