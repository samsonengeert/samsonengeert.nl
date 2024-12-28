const speaker = document.getElementById('speaker')
const song = document.getElementById('song')

song.onplay = () => {
    speaker.classList.remove('off')
}

song.onpause = () => {
    speaker.classList.add('off')
}

speaker.onclick = () => {
    song.paused ? song.play() : song.pause()
}
