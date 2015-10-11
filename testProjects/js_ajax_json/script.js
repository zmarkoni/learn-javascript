(function() {
    var placeholder = document.getElementById('placeholder');

    function print(result) {
        var iDiv = document.createElement('div');
        iDiv.id = 'content';
        iDiv.className = 'content';

        placeholder.appendChild(iDiv).innerHTML += result;
    }

    function loadTXT() {
        var request = new XMLHttpRequest();
        request.open("GET", "data.txt", true);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                print(request.responseText);
            }
        }
        request.send();
    }

    // loadTXT();

    function loadXML() {
        var request = new XMLHttpRequest();
        //http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp
        request.open("GET", "data.xml", true);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                //console.log(request.responseXML);
                // print(request.responseXML);
                var items = request.responseXML.getElementsByTagName('TITLE');
                var output = '<ul>';
                    for (var i = items.length - 1; i >= 0; i--) {
                       output += '<li>' + items[i].firstChild.nodeValue + '</li>';
                    };
                output += '</ul>';

                print(output);
            }
        }
        request.send();
    }

    // loadXML();

    function loadJSON() {
        var request = new XMLHttpRequest();
        request.open("GET", "data.json", true);
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                var items = JSON.parse(request.responseText);
                var output = '<ul>';
                for (var key in items) {
                    output += '<li>' + items[key].display + '</li>';
                }
                output += '</ul>';

                print(output);
            }
        }
        request.send();
    }

    loadJSON();

})();
