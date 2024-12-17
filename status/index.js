const info = document.getElementById('info')
const showMore = document.getElementById('show-more')
const darkModeToggle = document.getElementById('dark-mode-toggle')
const body = document.getElementsByTagName('body')[0]
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

showMore.onclick = () => {
    if (info.style.display === '') {
        showMore.classList.remove('rotate')
        info.style.display = 'none'
        return
    }

    showMore.classList.add('rotate')
    info.style.display = ''
}

if (localStorage.getItem('light-mode')) {
    body.classList.add('light')
}

darkModeToggle.onclick = () => {
    if (body.classList.contains('light')) {
        body.classList.remove('light')
        localStorage.removeItem('light-mode')
        return
    }

    localStorage.setItem('light-mode', 'true')
    body.classList.add('light')
}
