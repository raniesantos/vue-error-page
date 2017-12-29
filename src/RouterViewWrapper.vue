<template>
    <component v-if="code" :is="code"></component>
    <router-view v-else></router-view>
</template>

<script>
import config from './config';

export default {
    data () {
        return {
            code: false
        };
    },
    created () {
        window[config.bus].$on(config.event, (code) => {
            this.code = config.resolver(code);
        });
    },
    watch: {
        '$route' () {
            this.code = false;
        }
    }
};
</script>
