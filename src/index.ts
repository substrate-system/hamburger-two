import {
    lockBodyScrolling,
    unlockBodyScrolling
} from '@substrate-system/scroll-lock'
import { WebComponent } from '@substrate-system/web-component'
import { define as _define } from '@substrate-system/web-component/util'

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'hamburger-two':HamburgerTwo
    }
}

const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
].join(', ')

export class HamburgerTwo extends WebComponent.create('hamburger-two') {
    static TAG = 'hamburger-two'
    static observedAttributes = ['open', 'label', 'controls']
    static DEFAULT_LABEL = 'Menu'

    get isOpen ():boolean {
        return this.hasAttribute('open')
    }

    /**
     * Set or remove the `open` attribute. The work happens in
     * `handleChange_open`.
     */
    set isOpen (value:boolean) {
        this.toggleAttribute('open', value)
    }

    /**
     * The inner button.
     */
    get button ():HTMLButtonElement|null {
        return this.querySelector('button')
    }

    /**
     * The element named by the `controls` attribute.
     */
    get menu ():HTMLElement|null {
        const id = this.getAttribute('controls')
        if (!id) return null
        const root = this.getRootNode() as Document|ShadowRoot
        return root.getElementById(id)
    }

    _getElements () {
        return [
            this.querySelector('.hamburger-wrapper'),
            this.querySelector('.hamburger')
        ]
    }

    burgerIcon:null|string = null

    /**
     * Toggle the menu from user input. On open, emit the event first,
     * so the app can show the menu, then move focus into the menu.
     */
    hamburgle () {
        const opening = !this.isOpen
        this.isOpen = opening
        if (opening) {
            const first = this.menu?.querySelector<HTMLElement>(FOCUSABLE)
            first?.focus()
        }
    }

    /**
     * Handle 'open' attribute changes
     * @see {@link https://gomakethings.com/how-to-detect-when-attributes-change-on-a-web-component/#organizing-your-code Go Make Things article}
     *
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    handleChange_open (oldValue:string|null, newValue:string|null) {
        if ((oldValue === null) === (newValue === null)) return
        // connectedCallback syncs the state
        if (!this.isConnected) return

        this._sync()
        this.emit(newValue === null ? 'close' : 'open')
    }

    handleChange_label () {
        this._syncButton()
    }

    handleChange_controls () {
        this._syncButton()
    }

    /**
     * Apply the open or closed state to the DOM.
     */
    _sync () {
        const isOpen = this.isOpen
        document.body.classList.toggle('hamburging', isOpen)
        this.classList.toggle('open', isOpen)
        this._getElements().forEach(el => el?.classList.toggle('open', isOpen))
        if (isOpen) {
            lockBodyScrolling(document.body)
        } else {
            unlockBodyScrolling(document.body)
        }
        this._syncButton()
    }

    _syncButton () {
        const button = this.button
        if (!button) return
        button.setAttribute(
            'aria-label',
            this.getAttribute('label') || HamburgerTwo.DEFAULT_LABEL
        )
        button.setAttribute('aria-expanded', String(this.isOpen))
        const controls = this.getAttribute('controls')
        if (controls) {
            button.setAttribute('aria-controls', controls)
        } else {
            button.removeAttribute('aria-controls')
        }
    }

    _onKeydown = (ev:KeyboardEvent) => {
        if (ev.key !== 'Escape' || !this.isOpen) return
        this.isOpen = false
        this.button?.focus()
    }

    /**
     * Close when focus moves from the menu to somewhere outside of both
     * the menu and this element.
     */
    _onFocusout = (ev:FocusEvent) => {
        if (!this.isOpen) return
        const menu = this.menu
        const from = ev.target as Node
        const to = ev.relatedTarget as Node|null
        if (!menu || !to || !menu.contains(from)) return
        if (menu.contains(to) || this.contains(to)) return
        this.isOpen = false
    }

    /**
     * Create DOM and listen for events.
     */
    connectedCallback () {
        this.render()
        if (this.isOpen) this._sync()
        document.addEventListener('keydown', this._onKeydown)
        document.addEventListener('focusout', this._onFocusout)
    }

    disconnectedCallback () {
        document.removeEventListener('keydown', this._onKeydown)
        document.removeEventListener('focusout', this._onFocusout)
        if (this.isOpen) {
            document.body.classList.remove('hamburging')
            unlockBodyScrolling(document.body)
        }
    }

    render () {
        const isOpen = this.isOpen

        this.burgerIcon = `<div class="burger">
            <button type="button" name="open-nav">
                <span class="container top">
                    <span class="line top"></span>
                </span>
                <span class="container middle">
                    <span class="line middle"></span>
                </span>
                <span class="container bottom">
                    <span class="line bottom"></span>
                </span>
            </button>
        </div>`

        this.innerHTML = (`<div class="hamburger-wrapper">
            <div class="${'hamburger' + (isOpen ? ' open' : '')}">
                ${this.burgerIcon}
            </div>
        </div>`)

        this._syncButton()
        this.button!.addEventListener('click', () => this.hamburgle())
    }
}

export function define () {
    _define(HamburgerTwo.TAG, HamburgerTwo)
}

define()
