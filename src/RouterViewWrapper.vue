<template>
    <component v-if="code" :is="code" :payload="payload"></component>
    <router-view v-else></router-view>
</template>

<script>
import config from './config';

export default {
    data () {
        return {
            code: false,
            payload: null
        };
    },
    created () {
        window[config.bus].$on(config.event, (code, payload) => {
            this.code = config.resolver(code);
            this.payload = payload;
        });
    },
    watch: {
        '$route' () {
            this.code = false;
        }
    }
};
</script>
