$('#search').keyup(function() {

    var searchField = $('#search').val();
    var myExp = new RegExp(searchField, "i"); // i znaci da nije case sensitive
    $.getJSON('movies.json', function(data) {
        console.log(data);
        var output = '<ul class="searchresults">';
        $.each(data, function(key, val) {
            if ((val.id.search(myExp) != -1) || (val.name.search(myExp) != -1)) {
                output += '<li>';
                output += '<img src="images/' + val.image + '_tn.jpg">';
                output += '<h2>' + val.name + '</h2>';
                output += '<span><b>Average rating:</b> ' + val.averageRating + '</span>';
                output += '<span><b>Year: </b> ' + val.releaseYear + '</span>';
                output += '<a href=' + val.url + '>More info: </a>';
                output += '<p><b>Description:</b> ' + val.description + '</p>';
                output += '</li>';
            }
        });

        output += '</ul>';

        $('#placeholder').html(output);
    });
});

