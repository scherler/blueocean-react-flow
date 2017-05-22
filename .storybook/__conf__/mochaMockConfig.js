import {storiesOf, action, linkTo, specs, describe, it,} from "../__mocks__/facade-mocha";
global.storiesOf = storiesOf;
global.action = action;
global.linkTo = linkTo;
global.specs = specs;
global.describe = describe;
global.it = it;
global.after = after;
global.before = before;
global.beforeEach = beforeEach;
global.afterEach = afterEach;

import { JSDOM } from 'jsdom';

const exposedProperties = ['window', 'navigator', 'document'];
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7)' +
        ' AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.71 Safari/534.24'
    }
});

/**
 * Mocking browser-like DOM
 */

global.document = dom.window.document;
global.window = document.defaultView;
global.window.requestAnimationFrame = () => {};
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js',
};
