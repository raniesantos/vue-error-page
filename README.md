# vue-error-page

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-error-page.svg?style=flat-square)](https://www.npmjs.com/package/vue-error-page)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## (WARNING README INCOMPLETE)

PACKAGEDESCRIPTION.

___
## Why?

Because:

- [Trigger router-view change without changing current URL](https://github.com/vuejs/vue-router/issues/977)
- [How to load 404 component conditionally](https://forum.vuejs.org/t/how-to-load-404-component-conditionally/7781)
- [Handling 404's with router](https://laracasts.com/discuss/channels/vue/handling-404s-with-router)
- [404 after xmlhttprequest](https://forum.vuejs.org/t/404-after-xmlhttprequest/5362)
- [404 in SPA](https://forum.vuejs.org/t/404-in-spa/9399)

___
## Install

You can install this package via yarn (or npm):

```bash
$ yarn add vue-error-page
```

___
## Usage

### Setup

This package depends on a global event bus in order to emit events that will show the error page. You must first define an event bus on the `window` object. By default it looks for the key `eventBus` but you can configure this to something else.

You must also define a `resolver`. A resolver is a callback function that should return a Vue component and also indicate the directory where the error pages can be found.

```js
import ErrorPage from 'vue-error-page';

window.eventBus = new Vue();

Vue.use(ErrorPage, {
    resolver: (component) => {
        return require('./views/errors/' + component);
    }
});
```

### Other options

```js
Vue.use(ErrorPage, {
    resolver: (component) => {
        return require('./views/errors/' + component);
    },
    tagName: 'app-view',
    bus: 'eventBus',
    event: 'error-page'
});
```

Option       | Default Value  | Description
:----------: | :------------: | -----------
**resolver** | *(cmp) => { return cmp; }* | (Already described above.)
**tagName**  | *'app-view'*   | The name of the component that wraps `router-view`.
**bus**      | *'eventBus'*   | The name of the event bus. (Must be defined on `window`.)
**event**    | *'error-page'* | The name of the event being emitted and listened to.

### The wrapper component

Then you can swap `router-view` with `app-view` (or whatever name you defined for the wrapper component).

```html
<template>
    <div>
        <header></header>
        <nav></nav>
        <app-view></app-view>
        <footer></footer>
    </div>
</template>
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, dolorum.

Related: [Nuxt.js error() method](https://nuxtjs.org/guide/async-data#handling-errors)

```js
{
    path: '/profile/:username',
    component: require('./views/Profile')
}
```

```js
axios.get('/profile/' + this.$route.params.username)
    .then((response) => {
        // user was found
    })
    .catch((error) => {
        if (error.response.status === 404) {
            this.$_error(404);
        }
    });
```

___
## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
