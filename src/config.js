let config = {
    resolver: (component) => component,
    tagName: 'router-content',
    bus: 'eventBus',
    event: 'error-page'
};

export default config;

export const setOptions = (options) => { config = options; };
