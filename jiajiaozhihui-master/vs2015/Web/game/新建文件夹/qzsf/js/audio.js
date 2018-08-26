function seAudio() {
    var audio = document.getElementById("audio");
    audio.volume = 1;

    var player = {
        playing: false,
        current: null,
        ready: false,
        progress: 0,
        play: function (url) {
            console.log(url);
            if (player.playing) {
                player.stop();
                return;
            };
            player.playing = true;
            audio.src = url;
            audio.play(); // Start playback of the url

        },
        stop: function () {
            if (player.playing) {
                audio.pause(); // stop playback
                player.playing = false;
            }
        }
    };
    return {
        play: player.play
    }
}