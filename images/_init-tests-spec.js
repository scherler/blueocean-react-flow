import {storiesOf, action, linkTo, specs, describe, it} from "../.storybook/mock";
const jsdom = require('jsdom').jsdom;


/**
 * Prepares Enzyme's "mount" function for use by binding it to JSDOM.
 * Also takes care of a little bootstrapping of @js-extensions/ExtensionStore to avoid errors.
 * Place this snippet at the very top of your test file, before importing React: *
 * import { prepareMount } from './EnzymeUtils';
 * prepareMount();
 *
 */
export const prepareMount = () => {
    // code to boostrap mount with JSDOM
    // see: https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
    const exposedProperties = ['window', 'navigator', 'document'];
    global.document = jsdom('<!doctype html><html><body></body></html>', {
        headers: {
            'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7)' +
            ' AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.71 Safari/534.24'
        }
    });
    global.window = document.defaultView;
    global.navigator = global.window.navigator;
    global.window.requestAnimationFrame = () => {};
    global.window.location = {};
    Object.keys(document.defaultView).forEach((property) => {
        if (typeof global[property] === 'undefined') {
            exposedProperties.push(property);
            global[property] = document.defaultView[property];
        }
    });

    global.navigator = {
        userAgent: 'node.js',
    };
};


global.storiesOf = storiesOf;
global.action = action;
global.linkTo = linkTo;
global.specs = specs;
global.describe = describe;
global.it = it;
