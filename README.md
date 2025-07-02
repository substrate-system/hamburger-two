# package name here
![tests](https://github.com/substrate-system/hamburger-two/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@substrate-system/hamburger-two?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://flat.badgen.net/packagephobia/install/@bicycle-codes/keys?cache-control=no-cache)](https://packagephobia.com/result?p=@bicycle-codes/keys)
[![GZip size](https://img.badgesize.io/https%3A%2F%2Fesm.sh%2F%40substrate-system%2Fhamburger-two%2Fes2022%2Ffile.mjs?style=flat-square&compression=gzip)](https://esm.sh/@substrate-system/hamburger-two/es2022/hamburger-two.mjs)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

`<package description goes here>`

[See a live demo](https://substrate-system.github.io/hamburger-two/)

<!-- toc -->

## install

Installation instructions

```sh
npm i -S @substrate-system/hamburger-two
```

## API

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import '@substrate-system/hamburger-two'
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
my-hamburger-two {
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
    <my-hamburger-two></my-hamburger-two>
</div>
```

### pre-built
This package exposes minified JS and CSS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/hamburger-two/dist/index.min.js ./public/my-hamburger-two.min.js
cp ./node_modules/@substrate-system/hamburger-two/dist/style.min.css ./public/my-hamburger-two.css
```

#### HTML
```html
<head>
    <link rel="stylesheet" href="./my-hamburger-two.css">
</head>
<body>
    <!-- ... -->
    <script type="module" src="./my-hamburger-two.min.js"></script>
</body>
```
