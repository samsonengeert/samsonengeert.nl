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
     * @param {number} amount
     * @param {string} reason
     * @return {Debtor}
     */
    create(name, dateString, amount, reason) {
        const date = this.#dateFactory.create(dateString)
        return new Debtor(name, date, amount, reason)
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

window.addEventListener('load', () => {
    document.body.classList.remove('transition-none')
})

const debtors = [
    debtorFactory.create('The usual suspect', '2017-11-27', 46.43, 'Black Ops 3')
]

for (const debtor of debtors) {
    const debtorElement = createDebtorElement(debtor)
    debtorsElement.append(debtorElement)
}

if (debtors.length === 0) {
    const noDebtorsFoundElement = createNoDebtorsFoundElement()
    debtorsElement.append(noDebtorsFoundElement)
}

totalElement.innerHTML = formatAmountInEuros(debtors.reduce((total, debtor) => total + debtor.amountInEuros, 0))

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

    debtorArticleElement.insertAdjacentHTML('beforeend', `
    <h2>${formatAmountInEuros(debtor.amountInEuros)}</h2>
    <section class='info'>
        <h3>${debtor.name}</h3>
        <h5>${formatDate(debtor.date)}</h5>
        <article>
            <h4>Reden:</h4>
            <p>${debtor.reason}</p>
        </article>
    </section>
    <section class='background'></section>
    `)

    return debtorArticleElement
}
