import RouterViewWrapper from './RouterViewWrapper';
import config, { setOptions } from './config';
import error from './errorMixin';

const ErrorPage = {
    install (Vue, options) {
        setOptions(Object.assign(config, options));
        Vue.mixin(error);
        Vue.component(config.tagName, RouterViewWrapper);
    }
};

export default ErrorPage;
