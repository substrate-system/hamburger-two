import {
    lockBodyScrolling,
    unlockBodyScrolling
} from '@substrate-system/util/scroll'
import { createDebug } from '@substrate-system/debug'
const debug = createDebug()

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'hamburger-two': HamburgerTwo
    }
}

export class HamburgerTwo extends HTMLElement {
    static TAG = 'hamburger-two'
    static observedAttributes = ['open']

    static define<T extends { new (...args:any[]):HamburgerTwo; TAG:string }>(this:T) {
        define(this.TAG, this)
    }

    get isOpen ():boolean {
        return this.hasAttribute('open')
    }

    set isOpen (value:boolean) {
        const els = this.getElements()
        if (!value) {
            this.removeAttribute('open')
            els.forEach(el => el?.classList.remove('open'))
        } else {
            this.setAttribute('open', '')
            els.forEach(el => el?.classList.add('open'))
        }
    }

    getElements () {
        return [
            this.querySelector('.hamburger-wrapper'),
            this.querySelector('.hamburger')
        ]
    }

    burgerIcon:null|string = null
    transition:number = 200

    constructor () {
        super()

        const transition = this.getAttribute('transition')
        if (transition) {
            this.transition = parseInt(transition)
        }

        const open = this.getAttribute('open')
        if (open !== null) {
            this.isOpen = true
        }
    }

    clicker () {
        this.querySelector('label')?.addEventListener('click', () => {
            this.hamburgle()
        })

        this.querySelector('button')?.addEventListener('click', () => {
            this.hamburgle()
        })
    }

    open () {
        this.classList.add('open')
    }

    close () {
        this.classList.remove('open')
    }

    hamburgle () {
        this.isOpen = !this.isOpen

        if (this.isOpen) {
            this.open()
        } else {
            this.close()
        }

        // no scrolling when menu is open
        if (!this.isOpen) {
            // closed
            document.body.classList.remove('hamburging')
            unlockBodyScrolling(document.body)
        } else {
            // is open
            document.body.classList.add('hamburging')
            lockBodyScrolling(document.body)
        }
    }

    /**
     * Handle 'open' attribute changes
     * @see {@link https://gomakethings.com/how-to-detect-when-attributes-change-on-a-web-component/#organizing-your-code Go Make Things article}
     *
     * The work is done in the getter & setter methods.
     *
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    handleChange_open (oldValue:string, newValue:string) {
        if (newValue === oldValue) return

        debug('handling the change... old value', oldValue)
        debug('handling the change... new value', newValue)

        if (newValue === null) {
            // closed
            this.isOpen = false
        } else {
            // open
            this.isOpen = true
        }
    }

    /**
     * Runs when the value of any attribute is changed, which delegates
     * to `handeChange_name`.
     *
     * @param  {string} name     The attribute name
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    attributeChangedCallback (name:string, oldValue:string, newValue:string) {
        const handler = this[`handleChange_${name}`];
        (handler && handler.call(this, oldValue, newValue))
    }

    disconnectedCallback () {
        debug('disconnected')
    }

    /**
     * Create DOM and listen for events.
     */
    connectedCallback () {
        debug('connected')

        this.render()
        this.clicker()
    }

    render () {
        const isOpen = this.isOpen

        // ${Array.from(this.children).filter(Boolean).map(node => {
        //     return `<li>${node.outerHTML}</li>`
        // }).join('')}

        this.burgerIcon = `<label class="burger" for="burger-checkbox">
            <button>
                <div class="container top">
                    <div class="line top"></div>
                </div>
                <div class="container middle">
                    <div class="line middle"></div>
                </div>
                <div class="container bottom">
                    <div class="line bottom"></div>
                </div>
            </button>
        </label>`

        this.innerHTML = (`<div class="hamburger-wrapper">
            <div class="${'hamburger' + (isOpen ? ' open' : '')}">
                <input type="checkbox" id="burger-checkbox" checked=${isOpen} />
                ${this.burgerIcon}
            </div>
        </div>`)
    }
}

/**
 * Check if the given tag name has been registered.
 *
 * @see {@link https://stackoverflow.com/a/28210364 stackoverflow}
 * @param {string} elName The custom element tag name.
 * @returns {boolean} True if the given name has been registered already.
 */
export function isRegistered (elName:string):boolean {
    return document.createElement(elName).constructor !== window.HTMLElement
}

export function define (name:string, element:CustomElementConstructor) {
    if (!window) return
    if (!('customElements' in window)) return

    if (!isRegistered(name)) {
        window.customElements.define(name, element)
    }
}
