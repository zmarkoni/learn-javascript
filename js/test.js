
function addLinks () {
  for (var i=0, link; i<5; i++) {
    link = document.createElement("a");
    link.innerHTML = "Link " + i + "<br>";
    link.onclick = function (num) {
      return function () {//closure
        alert(num);
      };
    }(i); // (i)  ???
    var placeholder = document.getElementById('placeholder');
    placeholder.appendChild(link);
  }
}

//addLinks();
function foo(){
    function bar() {
        return 3;
    }
    return bar();
    function bar() {
        return 8;
    }
}
//alert(foo()); //8
/////////////////////

alert(foo());
function foo(){
    var bar = function() {
        return 3;
    };
    return bar();
    var bar = function() {
        return 8;
    };
}
//alert(foo()); //3