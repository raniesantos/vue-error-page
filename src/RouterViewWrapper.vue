<template>
    <component v-if="component" :is="component" :payload="payload"></component>
    <router-view v-else></router-view>
</template>

<script>
import config from './config';

export default {
    data () {
        return {
            component: false,
            payload: null
        };
    },
    created () {
        window[config.bus].$on(config.event, (component, payload) => {
            this.component = config.resolver(component);
            this.payload = payload;
        });
    },
    watch: {
        '$route' () {
            this.component = false;
        }
    }
};
</script>
