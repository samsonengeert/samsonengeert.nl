/**
 * @typedef {{
 *     name: string,
 *     href: string
 * }} SiteData
 */

/**
 * @typedef {{
 *     sites: SiteData[]
 * }} SiteDataIndexResponse
 */

/**
 * @param {number} milliseconds
 * @return {Promise<void>}
 */
function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * @param {number[][]} colors
 * @param {HTMLCollectionOf<HTMLElement>} elements
 * @return {Promise<void>}
 */
async function runColorReel(colors, elements) {
    while (true) {
        for (const [red, green, blue] of colors) {
            for (const element of elements) {
                element.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.15)`
            }
            await sleep(1000)
        }
        await sleep(1000)
    }
}


/**
 * @return {Promise<SiteDataIndexResponse>}
 */
function fetchSites() {
    return fetch('data/sites/index.json').then(res => res.json())
}

/**
 * @param {SiteData} siteData
 */
function createSiteElement(siteData) {
    const siteAnchorElement = document.createElement('a')
    siteAnchorElement.href = siteData.href

    const nameSpanElement = document.createElement('span')

    const slashBoldElement = document.createElement('b')
    slashBoldElement.innerText = '/'

    const divElement = document.createElement('div')

    const sectionElement = document.createElement('section')

    siteAnchorElement.appendChild(nameSpanElement)
    nameSpanElement.appendChild(slashBoldElement)
    nameSpanElement.append(siteData.name)
    siteAnchorElement.appendChild(divElement)
    siteAnchorElement.appendChild(sectionElement)

    return siteAnchorElement
}

const sitesElement = document.getElementById('sites')

const colorArray = [
    [181, 63, 63],
    [179, 63, 181],
    [63, 81, 181],
    [63, 181, 181],
    [81, 181, 63],
    [181, 172, 63]
]

fetchSites().then(response => {
    for (const siteData of response.sites) {
        const siteElement = createSiteElement(siteData)
        sitesElement.appendChild(siteElement)
    }

    const divElements = document.getElementsByTagName('div')

    return runColorReel(colorArray, divElements)
})
