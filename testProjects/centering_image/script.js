
(function(){

    var myNode = document.querySelector('#artlist ul');

    myNode.addEventListener("click", function(event) {

        if(event.target.tagName === "IMG"){
            console.log(event);
            //create an overlay
            var overlay = document.createElement("div");
            overlay.id = 'overlay';
            document.body.appendChild(overlay);

            overlay.style.position = 'absolute';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
            overlay.style.cursor = 'pointer';

            //resize and position fo overlay
            overlay.style.width = window.innerWidth + 'px';
            overlay.style.height = window.innerHeight + 300 + 'px';
            //The pageXOffset and pageYOffset properties returns the pixels the current document has been scrolled from the upper left corner of the window, horizontally and vertically.
            overlay.style.top = window.pageYOffset + 'px';
            overlay.style.left = window.pageXOffset + 'px';

            var imgSource = event.target.src;
            var intIndexOfMatch = imgSource.indexOf("400");


            // Loop over the string value replacing out each matching
            // substring.
            while (intIndexOfMatch != -1){
                //debugger;
                // Relace out the current instance 400 with 800
                imgSource = imgSource.replace("400","800");
                // Get the index of any next matching substring.
                 intIndexOfMatch = imgSource.indexOf("400");
            }
            // debugger;
            console.log(imgSource);
            //create an image
            var largeImg = document.createElement('img');
            largeImg.id = 'largeImg';
            largeImg.src = imgSource;
            largeImg.style.display = 'block';
            largeImg.style.position = 'absolute';

            //wait until image is loaded
            largeImg.addEventListener('load', function() {

                //resaze if image iz toller
                if(this.height > window.innerHeight){
                    this.ratio = window.innerHeight / this.height;
                    this.height = this.height * this.ratio;
                    this.width = this.width * this.ratio;
                }

                //resaze if image iz wither
                if(this.width > window.innerWidth){
                    this.ratio = window.innerHeight / this.width;
                    this.height = this.height * this.ratio;
                    this.width = this.width * this.ratio;
                }

                centerImage(this);
                overlay.appendChild(largeImg);

            });//image has loaded

            //listen when is clicked on image
            largeImg.addEventListener('click', function(){
                //if overlay exsists
                if(overlay){
                    overlay.parentNode.removeChild(overlay);//Need to be like this because removeChild works only on parentNode
                }
            },false);

            //handle the user scroll
            window.addEventListener('scroll', function(){
                if(overlay){
                    //again set the top and left
                    overlay.style.top = window.pageYOffset + 'px';
                    overlay.style.left = window.pageXOffset + 'px';
                }
            },false);//retunr false

        }//target is a image

    }, false);//image is clicked


    function centerImage(image) {
        var myDifX = (window.innerWidth - image.width) / 2;
        var myDifY = (window.innerHeight - image.height) / 2;

        image.style.left = myDifX + 'px';
        image.style.top = myDifY + 'px';

        return image;
    }

})();//self executing function

