# package name here
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/hamburger-two/nodejs.yml?style=flat-square)](https://github.com/substrate-system/hamburger-two/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/hamburger-two?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://flat.badgen.net/packagephobia/install/@bicycle-codes/keys?cache-control=no-cache)](https://packagephobia.com/result?p=@bicycle-codes/keys)
[![gzip size](https://img.shields.io/bundlephobia/minzip/@substrate-system/hamburger-two?style=flat-square)](https://bundlephobia.com/package/@substrate-system/hamburger-two)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)

Hamburger menu

[See a live demo](https://substrate-system.github.io/hamburger-two/)

<!-- toc -->

- [Install](#install)
- [Use](#use)
  * [Example](#example)
- [Modules](#modules)
  * [ESM](#esm)
  * [Common JS](#common-js)
  * [pre-built](#pre-built)
- [CSS](#css)
  * [Import CSS](#import-css)
  * [Customize CSS via variables](#customize-css-via-variables)
- [See also](#see-also)

<!-- tocstop -->

## Install

```sh
npm i -S @substrate-system/hamburger-two
```

## Use
Import, then call `.define` to register the element with the default tag name,
`hamburger-two`.

>
> [!NOTE]  
> This module only has client-side code. There is no provision for server-side
> rendering, because this element is only useful on the client-side.
>

```js
import { HamburgerTwo } from '@substrate-system/hamburger-two'
import '@substrate-system/hamburger-two/css'

HamburgerTwo.define()
```

### events
Typically you would use the tag in the DOM, then listen for events and show/hide
a menu element in response.

#### open

```js
HamburgerTwo.event('open')
// => 'hamburger-two:open'
```

```js
document.querySelector('hamburger-two')
    .addEventListener(HamburgerTwo.event('open'), () => {
        document
            .querySelector('.mobile-nav-menu')
            .classList
            .add('open')
    })
```

#### close

```js
HamburgerTwo.event('close')
// => 'hamburger-two:close'
```

```js
document.querySelector('hamburger-two')
    .addEventListener(HamburgerTwo.event('close'), () => {
        document
            .querySelector('.mobile-nav-menu')
            .classList
            .remove('open')
    })
```


## Example

See [./example](./example/index.ts).

```js
// after registering the component
document.body.innerHTML += `
    <hamburger-two></hamburger-two>
`

const el = document.querySelector('hamburger-two')

el?.addEventListener(HamburgerTwo.event('open'), () => {
    debug('menu is open...')
    document.querySelector('.mobile-nav-menu')!.classList.add('open')
})

el?.addEventListener(HamburgerTwo.event('close'), () => {
    debug('menu is closed...')
    document.querySelector('.mobile-nav-menu')!.classList.remove('open')
})
```

## Modules

This exposes ESM and common JS via
[package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import { HamburgerTwo } from '@substrate-system/hamburger-two'
```

### Common JS
```js
require('@substrate-system/hamburger-two')
```

### pre-built

This package exposes minified JS and CSS files too. Copy them to a location that
is accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/hamburger-two/dist/index.min.js ./public/hamburger-two.min.js
cp ./node_modules/@substrate-system/hamburger-two/dist/style.min.css ./public/hamburger-two.css
```

#### HTML
```html
<head>
    <link rel="stylesheet" href="./hamburger-two.css">
</head>
<body>
    <!-- ... -->
    <script type="module" src="./hamburger-two.min.js"></script>
</body>
```

## CSS

### Import CSS

```js
import '@substrate-system/hamburger-two/css'
```

Or minified:
```js
import '@substrate-system/hamburger-two/css/min'
```

### Customize CSS via variables

You can redefine the variable `--burger-open-color`. This sets the color of
the close "x" button when the menu is open. Default is "white".

```css
:root {
    --burger-open-color: white;
}
```

## See also

* [@substrate-system/hamburger](https://github.com/substrate-system/hamburger/)
  The same thing, different style.
