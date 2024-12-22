const urlParams = new URLSearchParams(window.location.search)

const speaker = document.getElementById('speaker')
const video = document.getElementById('video')
const elementsWithFrText = document.querySelectorAll('*[data-fr-text]')
const elementsWithFrHref = document.querySelectorAll('*[data-fr-href]')

const fr = urlParams.get('fr')

if (fr === 'oui') {
    for (const elementWithFr of elementsWithFrText) {
        elementWithFr.innerText = elementWithFr.getAttribute('data-fr-text')
    }

    for (const elementWithFrHref of elementsWithFrHref) {
        elementWithFrHref.href = elementWithFrHref.getAttribute('data-fr-href')
    }
}

speaker.onclick = () => {
    video.muted = !video.muted

    if (video.muted) {
        speaker.classList.add('off')
    } else {
        speaker.classList.remove('off')
    }
}
