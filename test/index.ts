import { test } from '@substrate-system/tapzero'
import { HamburgerTwo } from '../src/index.js'

test('example test', async t => {
    t.plan(3)

    document.body.innerHTML += `
        <hamburger-two class="test">
        </hamburger-two>
    `

    const el = document.querySelector('hamburger-two')!

    t.ok(el, 'should find an element')

    el.addEventListener(HamburgerTwo.event('open'), (ev) => {
        t.ok(ev, 'should emit "open" event')
    })

    el.isOpen = true

    console.log('elllll', JSON.stringify(Array.from(el.attributes), null, 2))

    setTimeout(() => {
        t.ok(el.hasAttribute('open'), 'should set the attribute')
    }, 10)
})
