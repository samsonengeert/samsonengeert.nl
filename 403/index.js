function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const r = getRandomInt(0, 255)
const g = getRandomInt(0, 255)
const b = getRandomInt(0, 255)
const color = `rgb(${r}, ${g}, ${b})`
const colorAlpha = `rgba(${r}, ${g}, ${b}, 0.1)`

const refresh = document.getElementById('refresh')
const back = document.getElementById('back')
const elementsWithTransition = document.querySelectorAll('.transition')
const colorElements = document.querySelectorAll('.dynamic-color')
const elementsWithFrText = document.querySelectorAll('*[data-fr-text]')
const elementsWithFrHref = document.querySelectorAll('*[data-fr-href]')

const urlParams = new URLSearchParams(window.location.search)
const fr = urlParams.get('fr')

if (fr === 'oui') {
    for (const elementWithFr of elementsWithFrText) {
        elementWithFr.innerText = elementWithFr.getAttribute('data-fr-text')
    }

    for (const elementWithFrHref of elementsWithFrHref) {
        elementWithFrHref.href = elementWithFrHref.getAttribute('data-fr-href')
    }
}

refresh.onclick = () => {
    location.reload()
}

back.onclick = () => {
    history.go(-1)
}

document.body.style.backgroundColor = colorAlpha

for (const colorElement of colorElements) {
    colorElement.style.color = color
}

let delay = 0

for (const elementWithTransition of elementsWithTransition) {
    if (elementWithTransition.classList.contains('short')) {
        delay += 0.25
    } else {
        delay += 0.5
    }

    elementWithTransition.style.transitionDelay = `${delay}s`
}

setTimeout(() => {
    for (const elementWithTransition of elementsWithTransition) {
        elementWithTransition.classList.remove('hidden')
    }
}, 100)

setTimeout(() => {
    for (const elementWithTransition of elementsWithTransition) {
        elementWithTransition.style.transitionDelay = ''
    }
}, delay * 1000)
