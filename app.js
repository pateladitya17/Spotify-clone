console.log("jay mataji");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName: "aa rat bhar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "bulleya", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "lat lag gai", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "ye zindgi", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "mere ham dam", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "naino vale ne", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "main rahoon ya na rahoon", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "nagada sang dhol vage", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "o bedardiya", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "o saki saki", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((Element, i ) => {
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;

    }
})

// Listen to Events
audioElement.addEventListener("timeupdate", () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();

        if (!audioElement.paused) {
            audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        gif.style.opacity = 0;
        } else {
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause"); 
        }


    })
})

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause"); 
})

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause"); 
})