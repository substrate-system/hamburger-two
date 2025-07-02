# template web component

A template for vanilla web components.

## see also

* [Web Component lifecycle methods](https://gomakethings.com/the-web-component-lifecycle-methods/)
* [How to detect when attributes change on a Web Component](https://gomakethings.com/how-to-detect-when-attributes-change-on-a-web-component/)

## use
1. Use the template button in github. Or clone this then
`rm -rf .git && git init`. Then `npm i && npm init`.

* Use the template system to re-name this module and start the docs:
```sh
node ./bin/cli.js --package-name=@nichoth/example --component-name=my-component --gh-namespace nichoth --repo-name my-repo-name
```

__The templates take several variables__

* `--gh-namespace` -- first path segment on github
* `--package-name` -- package name, including any namespace. eg, `@alice/package`
* `--component-name` -- the name of the web component, as used in HTML, eg `cool-example`
* `--repo-name` -- repository name, the last segment in github URL,
  eg, `github.com/user/repo-name-here`


2. Edit the source code in `src/index.ts`.

3. Delete either `.github/workflows/gh-pages-docs.yml` or `.github/workflows/gh-pages.yml`, depending on whether you want to deploy an example or docs to github pages.

4. __Edit things__
    * edit the [build-example](https://github.com/nichoth/template-web-component/blob/c580636f1c912fe2633f7c2478f28b11729c9b80/package.json#L20) command in `package.json` so that it has the right
    path for github pages

## featuring

* compile the source to both ESM and CJS format, and put compiled files in `dist`.
* ignore `dist` and `*.js` in git, but don't ignore them in npm. That way we
  don't commit any compiled code to git, but it is available to consumers.
* use npm's `prepublishOnly` hook to compile the code before publishing to npm.
* use [exports](./package.json#L41) field in `package.json` to make sure the right format is used
  by consumers.
* `preversion` npm hook -- lint
* `version` npm hook -- generate a TOC for the README, and create and add a
  changelog
* `postversion` npm hook -- `git push --follow-tags && npm publish`
* eslint -- `npm run lint`
* tests run in a browser environment via `tape-run` -- see [`npm test`](./package.json#L12).
  Includes `tap` testing tools -- [tapzero](https://github.com/bicycle-codes/tapzero)
  and [tap-spec](https://www.npmjs.com/package/tap-spec)
* CI via github actions
* [stylelint](https://stylelint.io/) -- see [preversion npm hook](https://github.com/nichoth/template-web-component/blob/main/package.json#L25)

## the component

See *[Web Component lifecycle methods](https://gomakethings.com/the-web-component-lifecycle-methods/)*.

### [attributeChangedCallback](https://gomakethings.com/how-to-detect-when-attributes-change-on-a-web-component/#the-attributechangedcallback-method)

> runs whenever an attribute on the Web Component is added, removed, or changes in value.

> For performance reasons, the attributeChangedCallback() method only watches and reacts to attributes you tell it to. To do that, you create a `static` `observedAttributes` property, with an array of attributes to watch as its value.

> You can use any attributes you’d like, including non-standard ones.


### [disconnectedCallback](https://gomakethings.com/the-web-component-lifecycle-methods/#the-connectedcallback-and-disconnectedcallback-methods)

