import { test } from '@substrate-system/tapzero'
import { HamburgerTwo } from '../src/index.js'
HamburgerTwo.define()

let count = 0

/**
 * Add a hamburger, a menu it controls, and a focusable element outside
 * of both. Call the returned `cleanup` at the end of the test.
 */
function setup (attrs:string = '') {
    const id = `test-menu-${count++}`
    const container = document.createElement('div')
    container.innerHTML = `
        <hamburger-two controls="${id}" ${attrs}></hamburger-two>
        <nav id="${id}">
            <a href="#one">one</a>
            <a href="#two">two</a>
        </nav>
        <button class="outside">outside</button>
    `
    document.body.appendChild(container)

    const el = container.querySelector('hamburger-two')!
    const menu = container.querySelector('nav')!
    const outside = container.querySelector<HTMLElement>('.outside')!
    const button = el.querySelector('button')!

    return {
        el,
        menu,
        outside,
        button,
        cleanup () {
            el.isOpen = false
            container.remove()
        }
    }
}

test('Hamburger', async t => {
    t.plan(3)

    document.body.innerHTML += `
        <hamburger-two class="test"></hamburger-two>
    `

    const el = document.querySelector('hamburger-two')!

    t.ok(el, 'should find an element')

    el.addEventListener(HamburgerTwo.event('open'), (ev) => {
        t.ok(ev, 'should emit "open" event')
    })

    // setting this opens the menu, emits the event
    el.isOpen = true

    t.ok(el.hasAttribute('open'), 'should set the attribute')

    el.isOpen = false
    el.remove()
})

test('document.createElement', t => {
    let el:HamburgerTwo|null = null
    try {
        el = document.createElement('hamburger-two')
    } catch (err) {
        t.fail('should not throw: ' + (err as Error).message)
    }
    t.ok(el instanceof HamburgerTwo, 'should create the element')
    t.equal(el!.attributes.length, 0,
        'constructor should not add attributes')
})

test('accessible name', t => {
    const { button, cleanup } = setup()
    t.ok(button, 'should render a button')
    t.ok(button.getAttribute('aria-label'),
        'button should have a default aria-label')
    cleanup()

    const custom = setup('label="Site navigation"')
    t.equal(custom.button.getAttribute('aria-label'), 'Site navigation',
        'should use the label attribute as aria-label')

    custom.el.setAttribute('label', 'Navigation')
    t.equal(custom.button.getAttribute('aria-label'), 'Navigation',
        'should update aria-label when label changes')
    custom.cleanup()
})

test('expanded state and controls', t => {
    const { el, menu, button, cleanup } = setup()
    t.equal(button.getAttribute('aria-controls'), menu.id,
        'should set aria-controls from the controls attribute')
    t.equal(button.getAttribute('aria-expanded'), 'false',
        'should start collapsed')

    el.isOpen = true
    t.equal(button.getAttribute('aria-expanded'), 'true',
        'should be expanded when open')

    el.isOpen = false
    t.equal(button.getAttribute('aria-expanded'), 'false',
        'should be collapsed when closed')
    cleanup()
})

test('no checkbox or label wrapper', t => {
    const a = setup()
    const b = setup()
    t.equal(a.el.querySelectorAll('input, label').length, 0,
        'should not render an input or a label')
    t.equal(a.el.querySelectorAll('[id]').length, 0,
        'should not render ids that collide between instances')
    a.cleanup()
    b.cleanup()
})

test('open and close through the attribute', t => {
    const { el, button, cleanup } = setup()
    const events:string[] = []
    el.on('open', () => events.push('open'))
    el.on('close', () => events.push('close'))

    el.setAttribute('open', '')
    t.equal(button.getAttribute('aria-expanded'), 'true',
        'should open when the attribute is added')
    el.removeAttribute('open')
    t.equal(button.getAttribute('aria-expanded'), 'false',
        'should close when the attribute is removed')
    t.deepEqual(events, ['open', 'close'], 'should emit both events')
    cleanup()
})

test('clicking the button emits before moving focus', t => {
    const { el, menu, button, cleanup } = setup()
    const firstLink = menu.querySelector('a')!
    let focusedAtEmit:Element|null = null
    el.on('open', () => {
        focusedAtEmit = document.activeElement
    })

    button.focus()
    button.click()

    t.ok(el.isOpen, 'should open on click')
    t.equal(focusedAtEmit, button,
        'focus should still be on the button when "open" is emitted')
    t.equal(document.activeElement, firstLink,
        'should move focus to the first link in the menu')

    button.click()
    t.ok(!el.isOpen, 'should close on the second click')
    cleanup()
})

test('Escape closes and returns focus', t => {
    const { el, menu, button, cleanup } = setup()
    button.click()
    t.ok(el.isOpen, 'should be open')

    const link = menu.querySelector('a')!
    link.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true
    }))

    t.ok(!el.isOpen, 'Escape should close the menu')
    t.equal(document.activeElement, button,
        'focus should return to the button')
    cleanup()
})

test('focus leaving the menu closes it', t => {
    const { el, outside, button, cleanup } = setup()
    button.click()
    t.ok(el.isOpen, 'should be open')

    outside.focus()
    t.ok(!el.isOpen, 'should close when focus moves outside the menu')
    cleanup()
})

test('clicks elsewhere in the host are not cancelled', t => {
    const { el, cleanup } = setup()
    const extra = document.createElement('span')
    el.appendChild(extra)
    const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
    extra.dispatchEvent(ev)
    t.ok(!ev.defaultPrevented, 'should not call preventDefault')
    t.ok(!el.isOpen, 'should not toggle the menu')
    cleanup()
})

test('all done', () => {
    if (window) {
        // @ts-expect-error tests
        window.testsFinished = true
    }
})
