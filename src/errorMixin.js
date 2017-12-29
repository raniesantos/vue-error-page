import config from './config';

export default {
    methods: {
        $_error (code, payload) {
            window[config.bus].$emit(config.event, code, payload);
        }
    }
};
