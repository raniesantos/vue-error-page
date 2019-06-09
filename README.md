# vue-error-page

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-error-page.svg?style=flat-square)](https://www.npmjs.com/package/vue-error-page)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://oss.ninja/mit/raniesantos)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![donate](https://img.shields.io/badge/$-donate-ff5f5f.svg?style=flat-square)](https://ko-fi.com/raniesantos)

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

This package depends on a global event bus in order to emit events that will show the error page. You must first define an event bus on the `window` object. By default it looks for the `eventBus` key but you can configure this to use a different key.

```js
import Vue from 'vue';
import ErrorPage from 'vue-error-page';

window.eventBus = new Vue();

Vue.use(ErrorPage);
```

### Options

```js
Vue.use(ErrorPage, {
    tagName: 'app-view',
    bus: 'eventBus',
    event: 'error-page',
    resolver: (component) => {
        return require('./views/Errors/' + component).default;
    }
});
```

Option       | Default Value  | Description
:----------: | :------------: | -----------
**tagName**  | *'app-view'*   | The name of the component that wraps `router-view`.
**bus**      | *'eventBus'*   | The name of the event bus. (Must be defined on `window`.)
**event**    | *'error-page'* | The name of the event being emitted and listened to.
**resolver** | *(component) => { return component; }* | This is essentially just a shortcut for importing the component. **This will not work with SSR**.

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

Finally, you can use the `$_error()` method injected into all components. You can call it to display a specific error page.

#### Example route

```js
{
    path: '/profile/:username',
    component: require('./views/Profile').default
}
```

#### views/Errors/NotFound.vue

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
import NotFound from './views/Errors/NotFound';

axios.get('/profile/' + this.$route.params.username)
    .then((response) => {
        // user was found
    })
    .catch((error) => {
        if (error.response.status === 404) {
            this.$_error(NotFound);
        }
    });
```

If you decided to define a resolver, you can directly specify the filename of the component like this `this.$_error('NotFound')`.

Additionally, if you name your error components after status codes like this `404.vue`, you can trigger error pages like this `this.$_error(404)`.

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
## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

___
## License

Released under the [MIT License](https://oss.ninja/mit/raniesantos).
