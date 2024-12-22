/**
 * @param {string} hex
 * @return {boolean}
 */
function isDarkTheme(hex){

    if (hex.slice(0, 1) === '#') {
        hex = hex.slice(1)
    }

    const r = parseInt(hex.slice(0,2),16)
    const g = parseInt(hex.slice(2,4),16)
    const b = parseInt(hex.slice(4,6),16)

    const yiq = ((r*299)+(g*587)+(b*114))/1000

    return yiq >= 128
}

/**
 * @param {number} milliseconds
 * @return {Promise<unknown>}
 */
function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * @param {string} text
 * @param {string} image
 * @param {string} color
 * @return {HTMLElement}
 */
function createToastElement(text, image, color) {
    const toastElement = document.createElement('section')
    toastElement.classList.add('copied-msg', 'transition', isDarkTheme(color) ? 'dark' : 'light')
    toastElement.style.backgroundColor = color

    const backgroundElement = document.createElement('article')
    backgroundElement.classList.add('bg')
    backgroundElement.style.backgroundImage = `url(${image})`

    toastElement.append(text)
    toastElement.append(backgroundElement)

    return toastElement
}

/**
 * @param {Meme} meme
 */
function createStageElement(meme) {
    const stageElement = document.createElement('section')
    stageElement.classList.add('stage')

    const innerElement = document.createElement('article')
    innerElement.classList.add('inner')

    const containerElement = document.createElement('section')
    containerElement.classList.add('container')

    const closeButtonElement = document.createElement('button')
    closeButtonElement.classList.add('close', 'transition')
    closeButtonElement.onclick = () => stageElement.remove()

    const sortSpanElement = document.createElement('span')
    sortSpanElement.classList.add('sort')
    sortSpanElement.innerText = meme.type

    const nameParagraphElement = document.createElement('p')
    nameParagraphElement.classList.add('name')
    nameParagraphElement.append(meme.name)
    nameParagraphElement.append(sortSpanElement)

    const imageElement = document.createElement('img')
    imageElement.classList.add('photo')
    imageElement.src = `data/memes/${meme.name}.${meme.type}`
    imageElement.alt = meme.name

    const backgroundElement = document.createElement('div')
    backgroundElement.classList.add('click-bg')
    backgroundElement.onclick = () => stageElement.remove()

    stageElement.append(innerElement)
    innerElement.append(containerElement)
    containerElement.append(closeButtonElement)
    containerElement.append(nameParagraphElement)
    containerElement.append(imageElement)
    innerElement.append(backgroundElement)

    return stageElement
}

/**
 * @typedef {{
 *     name: string,
 *     color: string,
 *     type: string
 * }} Meme
 */

/**
 * @typedef {{
 *     memes: Meme[]
 * }} MemeIndexResponse
 */

const eyeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 125">
        <path d="M62.5,16.6c5.6,0,11,0.9,16.2,2.5s9.8,3.9,13.8,6.6c4,2.7,7.7,5.7,11.2,9s6.4,6.5,8.8,9.8 c2.4,3.3,4.4,6.3,6.2,9s3,4.9,3.8,6.6l1.2,2.5c-0.2,0.4-0.4,0.9-0.8,1.6c-0.3,0.7-1.1,2.1-2.3,4.2c-1.2,2.1-2.4,4.1-3.8,6.2 c-1.3,2-3.1,4.4-5.3,7.2s-4.4,5.3-6.8,7.7c-2.3,2.4-5.1,4.8-8.3,7.2s-6.5,4.5-9.8,6.2c-3.4,1.7-7.2,3.1-11.3,4.2 c-4.2,1.1-8.5,1.6-12.8,1.6c-5.6,0-11-0.9-16.2-2.5s-9.8-3.9-13.8-6.6c-4-2.7-7.7-5.6-11.2-8.9s-6.4-6.5-8.8-9.8S8,74.5,6.3,71.8 s-3-4.9-3.8-6.6l-1.2-2.5c0.2-0.4,0.4-0.9,0.8-1.6s1.1-2.1,2.2-4.2s2.4-4.2,3.8-6.2c1.4-2,3.1-4.4,5.3-7.2s4.4-5.3,6.8-7.7 c2.3-2.4,5.1-4.8,8.3-7.2s6.5-4.5,9.9-6.2c3.4-1.7,7.2-3.1,11.3-4.2C53.9,17.1,58.1,16.6,62.5,16.6L62.5,16.6z M62.5,26.8 c-3.7,0-7.4,0.5-11,1.5c-3.6,1-6.8,2.3-9.7,3.8c-2.9,1.5-5.7,3.4-8.5,5.6c-2.8,2.2-5.1,4.4-7.1,6.5c-2,2.1-4,4.4-5.8,6.9 c-1.9,2.5-3.4,4.6-4.5,6.3c-1.1,1.8-2.2,3.5-3.2,5.3c1,1.7,2,3.5,3.1,5.2s2.6,3.8,4.5,6.3c1.9,2.4,3.8,4.7,5.8,6.8s4.4,4.3,7.1,6.4 s5.6,4,8.5,5.6c2.9,1.5,6.1,2.8,9.7,3.8c3.6,1,7.3,1.4,11,1.4s7.4-0.5,11-1.5c3.6-1,6.8-2.3,9.7-3.8c2.9-1.5,5.7-3.4,8.4-5.6 c2.8-2.2,5.1-4.4,7.1-6.5s3.9-4.4,5.8-6.9c1.9-2.4,3.4-4.6,4.5-6.3c1.1-1.8,2.2-3.5,3.2-5.2c-1-1.7-2-3.5-3.2-5.2s-2.6-3.8-4.5-6.3 s-3.8-4.7-5.8-6.8s-4.4-4.3-7.1-6.5c-2.8-2.2-5.6-4.1-8.4-5.6c-2.9-1.5-6.1-2.8-9.7-3.8C69.9,27.3,66.2,26.8,62.5,26.8L62.5,26.8z M62.5,42.1c5.6,0,10.4,2,14.4,6s6,8.8,6,14.4s-2,10.4-6,14.4c-4,4-8.8,6-14.4,6s-10.5-2-14.4-6s-6-8.8-6-14.4c0-5.6,2-10.5,6-14.4 C52,44.1,56.9,42.1,62.5,42.1z"/>
    </svg>
`

const linkIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 125">
        <path d="M115.3,10.2l-0.5-0.5c-11.3-11.3-29.7-11.3-40.9,0L47.8,35.8c-11.3,11.3-11.3,29.7,0,41l0.5,0.5 c0.9,0.9,1.9,1.8,3,2.6l9.5-9.6c-1.1-0.7-2.2-1.4-3.1-2.4l-0.5-0.5c-6.1-6.1-6.1-16.1,0-22.2l26.1-26.1c6.1-6.1,16.1-6.1,22.2,0 l0.5,0.5c6.1,6.1,6.1,16.1,0,22.2L94.1,53.6c2.1,5.1,3,10.5,2.9,15.8l18.3-18.3C126.6,39.9,126.6,21.5,115.3,10.2L115.3,10.2z M76.7,47.8c-0.9-0.9-1.9-1.8-3-2.6l-9.6,9.5c1.1,0.7,2.2,1.5,3.1,2.4l0.5,0.5c6.1,6.1,6.1,16.1,0,22.2l-26.1,26.1 c-6.1,6.1-16.1,6.1-22.2,0l-0.5-0.5c-6.1-6.1-6.1-16.1,0-22.2l11.8-11.8c-2-5.1-3-10.5-2.9-15.8L9.7,73.9 c-11.3,11.3-11.3,29.7,0,41l0.5,0.5c11.3,11.3,29.7,11.3,41,0l26.1-26.1c11.3-11.3,11.3-29.7,0-41L76.7,47.8L76.7,47.8z"/>
</svg>
`

const moreIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 125">
        <circle cx="62.1" cy="18.4" r="18.2"/>
        <circle cx="62.1" cy="62.7" r="18.2"/>
        <circle cx="62.1" cy="106.8" r="18.2"/>
    </svg>
`

const downloadIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125.5 125.5">
        <polygon points="115,28.5 115,125.5 10,125.5 10,28.5 50,28.5 50,41.5 23,41.5 23,113.5 102,113.5 102,41.5 75,41.5 75,28.5 "/>
        <polygon points="87.3,64.4 62.5,87.7 37.6,64.4 45.9,56.3 56,66 56,-2.5 69,-2.5 69,65.9 79.1,56.1 "/>
    </svg>
`

const body = document.querySelector('body')
const metronome = document.getElementById('metronome')
const martWeversAnthem = document.getElementById('mart-wevers-anthem')
const eye = document.getElementById('eye')
const pronunciation = document.getElementById('pronunciation')
const speaker = document.getElementById('speaker')
const memes = document.getElementById('memes')

console.error('Bram is te dik!')

window.addEventListener('DOMContentLoaded', () => {
    body.classList.remove('preload')
})

metronome.onmouseenter = () => {
    martWeversAnthem.volume = 0.5
    martWeversAnthem.play()
}

metronome.onmouseout = () => {
    martWeversAnthem.pause()
    martWeversAnthem.currentTime = 0.0
}

setInterval(async () => {
    eye.classList.add('visible')
    await delay(300)
    eye.classList.remove('visible')
}, 30000)

speaker.onclick = () => {
    if (!pronunciation.paused) {
        pronunciation.pause()
        pronunciation.currentTime = 0.0
        return
    }

    pronunciation.volume = 0.5
    pronunciation.play()
}

fetchMemes().then(response => response.memes.map(meme => {
    const memeElement = createMemeElement(meme)
    memes.appendChild(memeElement)
}))

/**
 * @param {Meme} meme
 */
function createMemeElement(meme) {
    const memeElement = document.createElement('section')
    memeElement.classList.add('meme')

    const innerElement = document.createElement('article')
    innerElement.classList.add('inner')
    innerElement.style.backgroundColor = meme.color
    innerElement.onmouseenter = () => {
        controlElement.classList.add('open')
    }
    innerElement.onmouseleave = () => {
        controlElement.classList.remove('open')
    }

    const controlElement = document.createElement('section')
    controlElement.classList.add('control', isDarkTheme(meme.color) ? 'dark' : 'light')

    const openOptionsButtonElement = document.createElement('button')
    openOptionsButtonElement.classList.add('open-options', 'transition')
    openOptionsButtonElement.innerHTML = moreIcon

    const optionsElement = document.createElement('section')
    optionsElement.classList.add('options', 'transition')
    optionsElement.style.color = meme.color
    optionsElement.style.fill = meme.color

    const seeButtonElement = document.createElement('button')
    seeButtonElement.innerHTML = `${eyeIcon}<span>pica g</span>`
    seeButtonElement.onclick = () => {
        body.appendChild(createStageElement(meme))
    }

    const downloadAnchorElement = document.createElement('a')
    downloadAnchorElement.download = meme.name
    downloadAnchorElement.innerHTML = `${downloadIcon}<span>omlaaglaad</span`
    downloadAnchorElement.href = `data/memes/${meme.name}.${meme.type}`

    const linkButtonElement = document.createElement('button')
    linkButtonElement.innerHTML = `${linkIcon}<span>direct a neef</span>`
    linkButtonElement.onclick = async () => {
        await navigator.clipboard.writeText(`${window.location.host}/meme/data/memes/${meme.name}.${meme.type}`)
        const copyLinkToastElement = createToastElement('Gekopieerd Mongool!', `data/memes/${meme.name}.${meme.type}`, meme.color)

        body.appendChild(copyLinkToastElement)

        await delay(100)
        copyLinkToastElement.classList.add('visible')
        await delay(5000)
        copyLinkToastElement.classList.remove('visible')
        await delay(100)
        copyLinkToastElement.remove()
    }

    const wrapperElement = document.createElement('section')
    wrapperElement.classList.add('p-wrapper', 'transition')

    const photoElement = document.createElement('article')
    photoElement.classList.add('photo')
    photoElement.style.backgroundImage = `url("data/memes/${meme.name}.${meme.type}")`

    const photoBackgroundElement = document.createElement('article')
    photoBackgroundElement.classList.add('photo', 'bg')
    photoBackgroundElement.style.backgroundImage = `url("data/memes/${meme.name}.${meme.type}")`

    memeElement.appendChild(innerElement)
    innerElement.appendChild(controlElement)
    controlElement.appendChild(optionsElement)
    optionsElement.appendChild(seeButtonElement)
    optionsElement.appendChild(linkButtonElement)
    optionsElement.appendChild(downloadAnchorElement)
    controlElement.appendChild(openOptionsButtonElement)
    innerElement.appendChild(wrapperElement)
    wrapperElement.appendChild(photoElement)
    wrapperElement.appendChild(photoBackgroundElement)

    return memeElement
}

/**
 * @return {Promise<MemeIndexResponse>}
 */
function fetchMemes() {
    return fetch('data/memes/index.json').then(res => res.json())
}
