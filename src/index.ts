import { createDebug } from '@substrate-system/debug'
const debug = createDebug()

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        '{{component-name}}': Example
    }
}

export class Example extends HTMLElement {
    // Define the attributes to observe
    // need this for `attributeChangedCallback`
    static observedAttributes = ['example']

    example:string|null

    constructor () {
        super()
        const example = this.getAttribute('example')
        this.example = example

        this.innerHTML = `<div>
            <p>example</p>
            <ul>
                ${Array.from(this.children).filter(Boolean).map(node => {
                    return `<li>${node.outerHTML}</li>`
                }).join('')}
            </ul>
        </div>`
    }

    /**
     * Handle 'example' attribute changes
     * @see {@link https://gomakethings.com/how-to-detect-when-attributes-change-on-a-web-component/#organizing-your-code Go Make Things article}
     *
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    handleChange_example (oldValue:string, newValue:string) {
        debug('handling example change', oldValue, newValue)

        if (newValue === null) {
            // [example] was removed
        } else {
            // set [example] attribute
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

    connectedCallback () {
        debug('connected')

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    debug('Node added: ', mutation.addedNodes)
                }
            })
        })

        observer.observe(this, { childList: true })

        this.render()
    }

    render () {
        this.innerHTML = `<div>
            <p>example</p>
            <ul>
                ${Array.from(this.children).filter(Boolean).map(node => {
                    return `<li>${node.outerHTML}</li>`
                }).join('')}
            </ul>
        </div>`
    }
}

if ('customElements' in window) {
    customElements.define('{{component-name}}', Example)
}
