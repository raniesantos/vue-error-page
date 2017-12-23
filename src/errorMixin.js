import config from './config';

export default {
    methods: {
        $_error (code) {
            window[config.bus].$emit(config.event, code);
        }
    }
};
