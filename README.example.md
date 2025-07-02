# package name here
![tests](https://github.com/{{gh-namespace}}/{{repo-name}}/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/{{package-name}}?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://flat.badgen.net/packagephobia/install/@bicycle-codes/keys?cache-control=no-cache)](https://packagephobia.com/result?p=@bicycle-codes/keys)
[![GZip size](https://img.badgesize.io/https%3A%2F%2Fesm.sh%2F%40{{gh-namespace}}%2F{{repo-name}}%2Fes2022%2Ffile.mjs?style=flat-square&compression=gzip)](https://esm.sh/@substrate-system/{{repo-name}}/es2022/{{repo-name}}.mjs)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

`<package description goes here>`

[See a live demo](https://{{gh-namespace}}.github.io/{{repo-name}}/)

<!-- toc -->

## install

Installation instructions

```sh
npm i -S {{package-name}}
```

## API

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import '{{package-name}}'
```

### Common JS
```js
require('{{package-name}}')
```

## CSS

### Import CSS

```js
import '{{package-name}}/css'
```

Or minified:
```js
import '{{package-name}}/css/min'
```

### Customize CSS via some variables

```css
{{component-name}} {
    --example: pink;
}
```

## use
This calls the global function `customElements.define`. Just import, then use
the tag in your HTML.

### JS
```js
import '{{package-name}}'
```

### HTML
```html
<div>
    <{{component-name}}></{{component-name}}>
</div>
```

### pre-built
This package exposes minified JS and CSS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/{{package-name}}/dist/index.min.js ./public/{{component-name}}.min.js
cp ./node_modules/{{package-name}}/dist/style.min.css ./public/{{component-name}}.css
```

#### HTML
```html
<head>
    <link rel="stylesheet" href="./{{component-name}}.css">
</head>
<body>
    <!-- ... -->
    <script type="module" src="./{{component-name}}.min.js"></script>
</body>
```
