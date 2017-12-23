<template>
    <component v-if="code" :is="component"></component>
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
    computed: {
        component () {
            return config.resolver(this.code);
        }
    },
    created () {
        window[config.bus].$on(config.event, (code) => {
            this.code = code;
        });
    },
    watch: {
        '$route' () {
            this.code = false;
        }
    }
};
</script>
