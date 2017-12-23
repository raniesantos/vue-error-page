let config = {
    resolver: (component) => component,
    tagName: 'app-view',
    bus: 'eventBus',
    event: 'error-page'
};

export default config;

export const setOptions = (options) => { config = options; };
