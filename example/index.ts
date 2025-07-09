import { HamburgerTwo } from '../src/index.js'
import '../src/index.css'
import './style.css'
import './mobile-nav.css'
import Debug from '@substrate-system/debug'
const debug = Debug()

HamburgerTwo.define()

const el = document.querySelector('hamburger-two')

el?.addEventListener(HamburgerTwo.event('open'), () => {
    debug('menu is open...')
    document.querySelector('.mobile-nav-menu')!.classList.add('open')
})

el?.addEventListener(HamburgerTwo.event('close'), () => {
    debug('menu is closed...')
    document.querySelector('.mobile-nav-menu')!.classList.remove('open')
})
