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

## install

```sh
npm i -S @substrate-system/hamburger-two
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

## CSS

### Import CSS

```js
import '@substrate-system/hamburger-two/css'
```

Or minified:
```js
import '@substrate-system/hamburger-two/css/min'
```

### Customize CSS via some variables

```css
hamburger-two {
    --example: pink;
}
```

## use
This calls the global function `customElements.define`. Just import, then use
the tag in your HTML.

### JS
```js
import '@substrate-system/hamburger-two'
```

### HTML
```html
<div>
    <hamburger-two></hamburger-two>
</div>
```

### pre-built
This package exposes minified JS and CSS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

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
