//http://api.jquery.com/jquery.ajax/

//load TXT file
//$('#placeholder').load('data.txt');

//load JSON file
$.getJSON('data.json', function(data) {
    //console.log(data);
    var output = '<ul>';
        $.each(data, function(key, val){
            output += '<li>' + val.display + '</li>';
        });
    output += '</ul>';

    $('#placeholder').html(output);
});