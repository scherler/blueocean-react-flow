import * as storybook from '@kadira/storybook';

//THIS IS NEEDED ONLY IF YOU ARE USING MOCHA AS A TEST RUNNER
import {storiesOf, action, linkTo, specs, describe, it,
after, before, beforeEach, afterEach} from "./facade";
import expect from 'expect'

window.describe = describe;
window.it = it;
window.expect = expect;
window.specs = specs;

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

// END OF SPECIFIC MOCHA CONF


function loadStories() {
  require('../stories/index');
}

storybook.configure(loadStories, module);
