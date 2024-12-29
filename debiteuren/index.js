/**
 * @typedef {{
 *     name: string,
 *     dateString: string,
 *     amountInEuros: number,
 *     reason: string
 * }} DebtorData
 */

/**
 * @typedef {{
 *     debtors: DebtorData[]
 * }} DebtorDataIndexResponse
 */

class Debtor {
    /**
     * @type {string}
     */
    #name

    /**
     * @type {Date}
     */
    #date

    /**
     * @type {number}
     */
    #amountInEuros

    /**
     * @type {string}
     */
    #reason

    /**
     * @param {string} name
     * @param {Date} date
     * @param {number} amountInEuros
     * @param {string} reason
     */
    constructor(name, date, amountInEuros, reason) {
        this.#name = name
        this.#date = date
        this.#amountInEuros = amountInEuros
        this.#reason = reason
    }

    get isSlob() {
        const date = new Date(
            this.#date.getFullYear(),
            this.#date.getMonth(),
            this.#date.getDate())

        const today = new Date()

        const thirtyDays = 1000 * 60 * 60 * 24 * 30

        return today - date > thirtyDays
    }

    get date() {
        return this.#date
    }

    get name() {
        return this.#name
    }

    get amountInEuros() {
        return this.#amountInEuros
    }

    get reason() {
        return this.#reason
    }
}

class DateFactory {

    /**
     * @param {string} dateString
     * @return {Date}
     */
    create(dateString) {
        const timestamp = Date.parse(dateString)

        if (isNaN(timestamp)) {
            throw new Error('Date must be a valid date string.')
        }

        return new Date(dateString)
    }
}

class DebtorFactory {
    #dateFactory

    /**
     * @param {DateFactory} dateFactory
     */
    constructor (dateFactory) {
        this.#dateFactory = dateFactory
    }

    /**
     * @param {string} name
     * @param {string} dateString
     * @param {number} amountInEuros
     * @param {string} reason
     * @return {Debtor}
     */
    create(name, dateString, amountInEuros, reason) {
        const date = this.#dateFactory.create(dateString)
        return new Debtor(name, date, amountInEuros, reason)
    }
}

/**
 * @param {number} amountInEuros
 * @return {string}
 */
function formatAmountInEuros(amountInEuros) {
    if (Math.floor(amountInEuros) === amountInEuros) {
        return `&euro;${amountInEuros},-`
    }

    return `&euro;${amountInEuros.toFixed(2).replace('.', ',')}`
}

/**
 * @param {Date} date
 * @return {string}
 */
function formatDate(date) {
    return date.toLocaleDateString('nl-nl')
}

const debtorFactory = new DebtorFactory(new DateFactory())

const debtorsElement = document.getElementById('debtors')
const totalElement = document.getElementById('total')

fetchDebtors().then(response => {
    /**
     * @type {Debtor[]}
     */
    const debtors = []
    for (const { name, dateString, amountInEuros, reason } of response.debtors) {
        const debtor = debtorFactory.create(name, dateString, amountInEuros, reason)
        debtors.push(debtor)
    }

    for (const debtor of debtors) {
        const debtorElement = createDebtorElement(debtor)
        debtorsElement.append(debtorElement)
    }

    if (debtors.length === 0) {
        const noDebtorsFoundElement = createNoDebtorsFoundElement()
        debtorsElement.append(noDebtorsFoundElement)
    }

    totalElement.innerHTML = formatAmountInEuros(debtors.reduce((total, debtor) => total + debtor.amountInEuros, 0))
})

function createNoDebtorsFoundElement() {
    const noDebtorsFoundElement = document.createElement('p')
    noDebtorsFoundElement.classList.add('debtor', 'none')
    noDebtorsFoundElement.innerText = 'Geen debiteuren gevonden.'

    return noDebtorsFoundElement
}

/**
 * @param {Debtor} debtor
 * @return {HTMLElement}
 */
function createDebtorElement(debtor) {
    const debtorArticleElement = document.createElement('article')
    debtorArticleElement.title = debtor.isSlob ? 'Sloeber' : 'Debiteur'
    debtorArticleElement.classList.add('debtor', debtor.isSlob ? 'red' : 'green')

    const amountHeading2Element = document.createElement('h2')
    amountHeading2Element.innerHTML = formatAmountInEuros(debtor.amountInEuros)

    const infoSectionElement = document.createElement('section')
    infoSectionElement.classList.add('info')

    const nameHeading3Element = document.createElement('h3')
    nameHeading3Element.innerText = debtor.name

    const dateHeading5Element = document.createElement('h5')
    dateHeading5Element.innerText = formatDate(debtor.date)

    const reasonArticleElement = document.createElement('article')

    const reasonHeading4Element = document.createElement('h4')
    reasonHeading4Element.innerText = 'Reden:'

    const reasonParagraphElement = document.createElement('p')
    reasonParagraphElement.innerText = debtor.reason

    const backgroundSectionElement = document.createElement('section')
    backgroundSectionElement.classList.add('background')

    debtorArticleElement.append(amountHeading2Element)
    debtorArticleElement.append(infoSectionElement)
    infoSectionElement.append(nameHeading3Element)
    infoSectionElement.append(dateHeading5Element)
    infoSectionElement.append(reasonArticleElement)
    reasonArticleElement.append(reasonHeading4Element)
    reasonArticleElement.append(reasonParagraphElement)
    debtorArticleElement.append(backgroundSectionElement)

    return debtorArticleElement
}

/**
 * @return {Promise<DebtorDataIndexResponse>}
 */
function fetchDebtors() {
    return fetch('data/debtors/index.json').then(res => res.json())
}
