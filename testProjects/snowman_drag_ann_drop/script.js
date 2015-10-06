//JS Listening for draging events http://www.html5rocks.com/en/tutorials/dnd/basics/

//namspace
var dragndrop = (function(){

  var myX = '';
  var myY = '';
  var whichArt = '';

  function resetZ(){
    var elements = document.querySelectorAll('img');
    for (var i = elements.length - 1; i >= 0; i--) {
      elements[i].style.zIndex = 5;
    };
  }

  function mouseStart(e){
    whichArt = e.target;
    myX = e.offsetX === undefined ? e.layerX : e.offsetX;
    myY = e.offsetY === undefined ? e.layerY : e.offsetY;
    resetZ();
    whichArt.style.zIndex = 10;
    console.log(e.target);

  }
  //prevent broweser to something while draging the image
  function moveDragOver(e){
    e.preventDefault();
  }

  function moveDrop(e){
    e.preventDefault();
    whichArt.style.left = e.pageX - myX + 'px';
    whichArt.style.top = e.pageY - myY + 'px';
  }

  document.querySelector('body').addEventListener('dragstart', mouseStart, false);
  document.querySelector('body').addEventListener('dragover', moveDragOver, false);
  document.querySelector('body').addEventListener('drop', moveDrop, false);


  //for mobile devices only - for touch screen
  function touchStart(e){
    e.preventDefault();

    //touch events are different in compare of move events
    var whichArtMobile = e.target;
    var touch = e.touches[0]; //get first touch
    var moveOffestX = whichArtMobile.offesetLeft - touch.pageX;
    var moveOffestY = whichArtMobile.offesetTop - touch.pageY;
    resetZ();
    whichArtMobile.style.zIndex = 10;

    //add event listener for touch moving
    whichArtMobile.addEventListener('touchmove', function(){
      var positionX = touch.pageX + moveOffestX;
      var positionY = touch.pageY + moveOffestY;

      whichArtMobile.style.left = positionX + 'px';
      whichArtMobile.style.top = positionY + 'px';

    },false);


  }

  document.querySelector('body').addEventListener('touchStart', touchStart, false);

})();