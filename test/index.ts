import { test } from '@substrate-system/tapzero'
import { waitFor } from '@substrate-system/dom'
import '../src/index.js'

test('example test', async t => {
    document.body.innerHTML += `
        <my-hamburger-two class="test">
        </my-hamburger-two>
    `

    const el = await waitFor('my-hamburger-two')

    t.ok(el, 'should find an element')
})
