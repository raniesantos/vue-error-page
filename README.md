# vue-error-page

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-error-page.svg?style=flat-square)](https://www.npmjs.com/package/vue-error-page)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## (WARNING README INCOMPLETE)

PACKAGEDESCRIPTION.

___
## Install

You can install this package via yarn (or npm):

```bash
$ yarn add vue-error-page
```

___
## Usage

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, dolorum.

```js
import ErrorPage from 'vue-error-page';

window.eventBus = new Vue();

Vue.use(ErrorPage, {
    resolver: (component) => {
        return require('./views/errors/' + component);
    }
});
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, dolorum.

```js
Vue.use(ErrorPage, {
    resolver: (component) => {
        return require('./views/errors/' + component);
    }
    tagName: 'app-view',
    bus: 'eventBus',
    event: 'error-page'
});
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, dolorum.

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
