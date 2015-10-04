var jukebox = document.querySelector('ul.player');

jukebox.addEventListener('click', function(e) {
    e.preventDefault();

    var songName = e.target.getAttribute('data-src');
    var audioPlayer = document.querySelector('#player');

    //check HTML audio/video Methods,properties
    if (audioPlayer) {
        //check if song is played on right element
        if (songName === audioPlayer.getAttribute('src')) {
            if (audioPlayer.paused) {
                audioPlayer.play();
                e.target.id = 'playing';
            } else {
                audioPlayer.pause();
                e.target.id = 'paused';
            }

        } else { //play new song
            audioPlayer.src = songName;
            audioPlayer.play();
            //check if song is playing
            if (document.querySelector('#playing')) {
                document.querySelector('#playing').id = '';
                e.target.id = 'playing';
            } else {
                document.querySelector('#paused').id = '';
                e.target.id = 'paused';
            }
        }

    } else { //create audio eement
        var audioPlayer = document.createElement('audio');
        audioPlayer.id = 'player';
        audioPlayer.src = songName;
        e.target.id = 'playing';
        document.body.appendChild(audioPlayer);
        audioPlayer.play();

        audioPlayer.addEventListener('ended', function() {
            audioPlayer.parentNode.removeChild(audioPlayer);
            e.target.id = '';
        }, false); //remove audio tag when song end

    }


}, false);
