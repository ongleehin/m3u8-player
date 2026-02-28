var video = document.getElementById('video');

function playM3u8(url) {
    if (Hls.isSupported()) {
        video.volume = 0.3;
        var hls = new Hls();
        var m3u8Url = decodeURIComponent(url);
        hls.loadSource(m3u8Url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
        // document.title = url;
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('canplay', function () {
            video.play();
        });
        // video.volume = 0.3;
        // document.title = url;
    }
}

function playPause() {
    console.log(`playPause ${video.paused}`)
    video.paused ? video.play() : video.pause();
}

function volumeUp() {
    console.log(`volumeUp ${video.volume}`)
    if (video.volume <= 0.9) video.volume += 0.1;
}

function volumeDown() {
    console.log(`volumeDown ${video.volume}`)
    if (video.volume >= 0.1) video.volume -= 0.1;
}

function seekRight() {
    console.log(`seekRight ${video.currentTime}`)
    video.currentTime += 5;
}

function seekLeft() {
    console.log(`seekLeft ${video.currentTime}`)
    video.currentTime -= 5;
}

function increasePlaybackRate() {
    console.log(`increasePlaybactRate ${video.playbackRate}`)
    video.playbackRate += 0.1;
}

function decreasePlaybackRate() {
    console.log(`decreasePlaybactRate ${video.playbackRate}`)
    if (video.playbackRate >= 0.1) video.playbackRate -= 0.1;
}

function toggleMute() {
    console.log(`toggleMute ${video.muted}`)
    video.muted = !video.muted;
}

function vidFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

playM3u8(window.location.href.split('#')[1]);
$(window).on('load', function () {
    $('#video').on('click', function () {
        this.paused ? this.play() : this.pause();
    });
    Mousetrap.bind('space', playPause);
    Mousetrap.bind('up', volumeUp);
    Mousetrap.bind('down', volumeDown);
    Mousetrap.bind('right', seekRight);
    Mousetrap.bind('left', seekLeft);
    Mousetrap.bind('f', vidFullscreen);
    Mousetrap.bind('m', toggleMute);
    Mousetrap.bind('ctrl+.', increasePlaybackRate);
    Mousetrap.bind('ctrl+,', decreasePlaybackRate);
});
