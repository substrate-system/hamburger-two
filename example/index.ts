import { HamburgerTwo } from '../src/index.js'
import '../src/index.css'
import './style.css'
import Debug from '@substrate-system/debug'
const debug = Debug()

HamburgerTwo.define()

document.body.innerHTML += `
    <hamburger-two></hamburger-two>
`

const el = document.querySelector('hamburger-two')

el?.addEventListener(HamburgerTwo.event('open'), () => {
    debug('menu is open...')
})

el?.addEventListener(HamburgerTwo.event('close'), () => {
    debug('menu is closed...')
})
