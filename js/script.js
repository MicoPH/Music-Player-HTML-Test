const music = document.querySelector("audio");
const seekbar = document.getElementById("slider");
const seekbar1 = document.getElementById("slider1");
const playbutton = document.getElementById("playpause");
const playbutton1 = document.getElementById("playpause1");
const currentTextTime = document.getElementById('currentbar');
const currentTextTime1 = document.getElementById('currentbar1');
const endTextTime = document.getElementById('endbar');
const endTextTime1 = document.getElementById('endbar1');
const currentseek = document.getElementById('currentplayback');
const currentseek1 = document.getElementById('currentplayback1');
const playbackfunc = document.getElementById("playback");
const songtitle = document.getElementById("songTitle");
const songartist = document.getElementById("songArtist");
const songalbum = document.getElementById("songAlbum");
const copyrightowner = document.getElementById("songCopyright");
const audiodata = document.getElementById("audiodata");
const videodata = document.getElementById("videopreview");
const albumdata = document.getElementById("album");
const coverdata = document.getElementById("coverpreview");
let isSeeking = false;
let setExpand = false;
let currentIndex = 0;
const currentprogvol = document.getElementById('currentplaybackvol');
const currentprogvol1 = document.getElementById('currentplaybackvol1');
const volslide = document.getElementById('volumeslider');
const volslide1 = document.getElementById('volumeslider1');
const textlyric = document.querySelector(".lyricpreview .textbox h3");


// Initial Audio
audiodata.src = Tracks[currentIndex].audiosource;

// If audio is loaded
music.addEventListener('loadedmetadata', () => {
    seekbar.max = music.duration;
    seekbar1.max = music.duration;
    let endMin = Math.floor(music.duration/60);
    let endSec = Math.floor(music.duration % 60).toString().padStart(2,'0');
    endTextTime.innerHTML = `${endMin}:${endSec}`;
    endTextTime1.innerHTML = `${endMin}:${endSec}`;
    songtitle.innerHTML = Tracks[currentIndex].title;
    document.querySelector('title').innerHTML =  Tracks[currentIndex].title + ' - ' + Tracks[currentIndex].artist + ' | HTML';
    songartist.innerHTML = Tracks[currentIndex].artist;
    songalbum.innerHTML = Tracks[currentIndex].album;
    copyrightowner.innerHTML = Tracks[currentIndex].year + " © " + Tracks[currentIndex].copyrightholder + ". All rights reserved";
    if(Tracks[currentIndex].videoPreviewMode){
        videodata.src = Tracks[currentIndex].videopreviewsource;
        videodata.style.opacity = "1";
        coverdata.style.opacity = "0";
    } else {
        coverdata.src = Tracks[currentIndex].coverpreviewsource;
        coverdata.style.opacity = "1";
        videodata.style.opacity = "0";
    }
    albumdata.src = Tracks[currentIndex].albumpreviewsource
    document.getElementById('iconchanger').href = Tracks[currentIndex].albumpreviewsource
    lyricsync = Tracks[currentIndex].lyrics.map((lines) => {
        return {start_time: lines.start_time, lyricdata: lines.text, end_time: lines.end_time}
    })
    
});

// Seek with changing audio time
seekbar.addEventListener('click', (e) => {
    const clickX = e.offsetX;
    const seekbarwidth = seekbar.offsetWidth;
    seekbar1.value = seekbar.value;
    const seektime = (clickX / seekbarwidth) * music.duration;
    music.currentTime = seektime;
});
seekbar1.addEventListener('click', (e) => {
    const clickX = e.offsetX;
    const seekbarwidth = seekbar1.offsetWidth;
    seekbar.value = seekbar1.value;
    const seektime = (clickX / seekbarwidth) * music.duration;
    music.currentTime = seektime;
});

// Idle audio process
music.addEventListener('timeupdate', () => {
    if (music.paused){
        playbutton.src = "img/play.svg";
        playbutton1.src = "img/play.svg";
    } else {
        playbutton.src = "img/pause.svg";
        playbutton1.src = "img/pause.svg";
    };
    const progpercentage = (music.currentTime / music.duration) * 100;
    var currenttimer = progpercentage + '%';
    if (!isSeeking){
        currentseek.style.width = currenttimer;
        currentseek1.style.width = currenttimer;
        seekbar.value = music.currentTime;
        seekbar1.value = music.currentTime;
    };
    if (setExpand){
        colorbkgplayback = "linear-gradient(90deg,rgba(255,255,255,0.8) " + progpercentage +"%, rgba(59,59,59,0.4) "+ progpercentage+"%)";
        playbackfunc.style.background = colorbkgplayback;
    };
    let currentTime = music.currentTime;
    let currentMin = Math.floor(currentTime/60);
    let currentSec = Math.floor(currentTime % 60).toString().padStart(2,'0');
    currentTextTime.innerHTML = `${currentMin}:${currentSec}`;
    currentTextTime1.innerHTML = `${currentMin}:${currentSec}`;
})

// Clickable Play & Pause Buttons
function playbuttonset(){
    if (music.paused){
        music.play();
        playbutton.src = "img/pause.svg";
        playbutton1.src = "img/pause.svg";
    } else {
        music.pause();
        playbutton.src = "img/play.svg";
        playbutton1.src = "img/play.svg";
    }
}
playbutton.addEventListener('click', playbuttonset);
playbutton1.addEventListener('click', playbuttonset);

// If Seekbar start to seek
seekbar.addEventListener('touchstart', () => {
    isSeeking = true;
});
seekbar1.addEventListener('touchstart', () => {
    isSeeking = true;
});
seekbar.addEventListener('mousedown', () => {
    isSeeking = true;
    const progpercentage1 = (seekbar.value / music.duration) * 100;
    var currenttimer1 = progpercentage1 + '%';
    currentseek.style.width = currenttimer1;
    currentseek1.style.width = currenttimer1;
});
seekbar1.addEventListener('mousedown', () => {
    isSeeking = true;
    const progpercentage1 = (seekbar1.value / music.duration) * 100;
    var currenttimer1 = progpercentage1 + '%';
    currentseek.style.width = currenttimer1;
    currentseek1.style.width = currenttimer1;
});

// When moving seekbar
seekbar.addEventListener('input', () => {
    const progpercentage1 = (seekbar.value / music.duration) * 100;
    var currenttimer1 = progpercentage1 + '%';
    currentseek.style.width = currenttimer1;
    currentseek1.style.width = currenttimer1;
});
seekbar1.addEventListener('input', () => {
    const progpercentage1 = (seekbar1.value / music.duration) * 100;
    var currenttimer1 = progpercentage1 + '%';
    currentseek.style.width = currenttimer1;
    currentseek1.style.width = currenttimer1;
});

// If seekbar stops moving 
seekbar.addEventListener('touchend', () => {
    music.currentTime = seekbar.value;
    isSeeking = false;
});
seekbar1.addEventListener('touchend', () => {
    music.currentTime = seekbar1.value;
    isSeeking = false;
})
seekbar.addEventListener('mouseup', () => {
    isSeeking = false;
});
seekbar1.addEventListener('mouseup', () => {
    isSeeking = false;
});

// Expand audio playback for lyrics
document.getElementById("expndlrc").addEventListener('click', function(){
    if (setExpand){
        playbackfunc.classList.remove("expand");
        playbackfunc.removeAttribute("style");
        document.querySelector(".overlay").classList.remove("expand")
        document.getElementById('expandplayback').style.display = "none";
        document.querySelector(".lyricpreview").style.display = "none";
        setExpand = false;
    } else {
        playbackfunc.classList.add("expand");
        document.querySelector(".lyricpreview").removeAttribute("style");
        document.getElementById('expandplayback').removeAttribute("style");
        document.querySelector(".overlay").classList.add("expand");
        setExpand = true;
    }
});


// Lyric format are based on Subtitle Editor - Type 8 (JSON)
// Idle Lyrics
music.addEventListener('timeupdate', () => {
    const musictime = music.currentTime;
    if (lyricsync[0].start_time>musictime){
        textlyric.innerHTML = "";
        textlyric.setAttribute("data-text", "");
    }
    lyricsync.forEach((item) => {
        if(musictime > item.start_time){
            if (musictime > item.end_time){
                textlyric.innerHTML = '';
                return
            }
            textlyric.innerHTML = item.lyricdata;
        }
    });
});

// Volume function
function movevolume(){
    var volpercentage = volslide.value+'%';
    currentprogvol.style.width = volpercentage;
    music.volume = volslide.value / 100;
    volslide1.value = volslide.value
    currentprogvol1.style.width = volpercentage;

};
function movevolume1(){
    var volpercentage = volslide1.value+'%';
    currentprogvol1.style.width = volpercentage;
    music.volume = volslide1.value / 100;
    volslide.value = volslide1.value
    currentprogvol.style.width = volpercentage;
};

volslide.addEventListener('input', movevolume);
volslide1.addEventListener('input', movevolume1);

// Next and Previous Playback function
function nextPlayback() {
    currentIndex = (currentIndex + 1) % Tracks.length;
    audiodata.src = Tracks[currentIndex].audiosource;
    music.play();
    currentseek.style.width = "0%";
    currentseek1.style.width = "0%";
    if (setExpand){
        colorbkgplayback = "linear-gradient(90deg,rgba(255,255,255,0.8) 0%, rgba(59,59,59,0.4) 0%)";
        playbackfunc.style.background = colorbkgplayback;
    }
};
function prevPlayback() {
    currentIndex = (currentIndex - 1 + Tracks.length) % Tracks.length;
    audiodata.src = Tracks[currentIndex].audiosource;
    music.play();
    currentseek.style.width = "0%";
    currentseek1.style.width = "0%";
    if (setExpand){
        colorbkgplayback = "linear-gradient(90deg,rgba(255,255,255,0.8) 0%, rgba(59,59,59,0.4) 0%)";
        playbackfunc.style.background = colorbkgplayback;
    }
};
document.getElementById('prev').addEventListener('click', prevPlayback);
document.getElementById('next').addEventListener('click', nextPlayback);
document.getElementById('prev1').addEventListener('click', prevPlayback);
document.getElementById('next1').addEventListener('click', nextPlayback);

// If Music is ended
music.addEventListener('ended',nextPlayback);