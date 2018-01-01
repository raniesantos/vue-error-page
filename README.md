# vue-error-page

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-error-page.svg?style=flat-square)](https://www.npmjs.com/package/vue-error-page)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)

Provides a wrapper for router-view that allows you to show error pages without changing the URL.

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

You must also define a `resolver`. A resolver is a callback function that should return the error page component and also indicate the directory where the error pages can be found.

```js
import Vue from 'vue';
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
        return component;
    },
    tagName: 'app-view',
    bus: 'eventBus',
    event: 'error-page'
});
```

Option       | Default Value  | Description
:----------: | :------------: | -----------
**resolver** | *(component) => { return component; }* | (Already described above.) Although this has a default value, *you should still define it* in order to make the package aware of your directory structure and allow it to automatically require components.
**tagName**  | *'app-view'*   | The name of the component that wraps `router-view`.
**bus**      | *'eventBus'*   | The name of the event bus. (Must be defined on `window`.)
**event**    | *'error-page'* | The name of the event being emitted and listened to.

### The wrapper component

Then you can swap `router-view` with `app-view` (or whatever you defined for `tagName`).

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

### Triggering the error page

Finally, you can use the `$_error()` method injected into all components. You can call it to display a specific error page. As a side note, this idea was taken from Nuxt.js.

Related: [Nuxt.js error() method](https://nuxtjs.org/guide/async-data#handling-errors)

#### Example route

```js
{
    path: '/profile/:username',
    component: require('./views/Profile')
}
```

#### views/errors/NotFound.vue

```html
<template>
    <div>
        <h1>404 Error</h1>
        <p>The resource could not be found.</p>
        <router-link to="/" exact>
            Go to home page
        </router-link>
    </div>
</template>
```

#### views/Profile.vue

```js
axios.get('/profile/' + this.$route.params.username)
    .then((response) => {
        // user was found
    })
    .catch((error) => {
        if (error.response.status === 404) {
            this.$_error('NotFound');
        }
    });
```

Alternatively, you can name your error components after status codes like this `404.vue` so that you can trigger error pages like this `this.$_error(404)`.

### Passing additional data to the error page

You can pass a *payload* as an additional argument to `$_error()`.

```js
this.$_error(404, {
    username: this.$route.params.username
});
```

The payload will be available as a prop in the component.

```html
<template>
    <div>
        <h1>404 Error</h1>
        <p>User {{ payload.username }} not found.</p>
        <router-link to="/" exact>
            Go to home page
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['payload']
};
</script>
```

___
## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
