import config from './config';

export default {
    methods: {
        $_error (component, payload) {
            window[config.bus].$emit(config.event, component, payload);
        }
    }
};
