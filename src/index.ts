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

    transition:number = 200

    get isOpen ():boolean {
        return this.hasAttribute('open')
    }

    set isOpen (value:boolean) {
        if (!value) {
            this.removeAttribute('open')
        } else {
            this.setAttribute('open', '')
        }
    }

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

    hamburgle () {
        this.isOpen = !this.isOpen

        // no scrolling when menu is open
        if (!this.isOpen) {
            document.body.classList.remove('hamburging')
            unlockBodyScrolling(document.body)
        } else {
            document.body.classList.add('hamburging')
            lockBodyScrolling(document.body)
        }
    }

    /**
     * Handle 'example' attribute changes
     * @see {@link https://gomakethings.com/how-to-detect-when-attributes-change-on-a-web-component/#organizing-your-code Go Make Things article}
     *
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    handleChange_open (oldValue:string, newValue:string) {
        debug('handling open change', oldValue, newValue)

        if (newValue === oldValue) return

        if (newValue === null) {
            this.isOpen = false
        } else {
            this.isOpen = true
        }
    }

    /**
     * Runs when the value of an attribute is changed
     *
     * @param  {string} name     The attribute name
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    attributeChangedCallback (name:string, oldValue:string, newValue:string) {
        debug('an attribute changed', name)
        const handler = this[`handleChange_${name}`];
        (handler && handler(oldValue, newValue))
        this.render()
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

        this.querySelector('button')?.addEventListener('click', ev => {
            ev.preventDefault()
            this.hamburgle()
        })

        this.querySelector('label')?.addEventListener('click', ev => {
            ev.preventDefault()
            this.hamburgle()
        })
    }

    render () {
        const isOpen = this.isOpen

        this.innerHTML = (`<div class="hamurger-wrapper">
            <div class="${'hamburger' + (isOpen ? ' open' : '')}">
                <input type="checkbox" id="burger-checkbox" checked=${isOpen} />
                <label class="burger" for="burger-checkbox">
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
                </label>
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
