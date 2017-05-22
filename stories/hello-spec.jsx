import React from 'react';
import { mount } from 'enzyme';
import expect from "expect";

const stories = storiesOf('Hello world', module);

const storyName = 'Simple hello world';
stories.add(storyName, function() {
    const story = (<div>Sag hallo</div>);

    specs(() => describe(storyName, function() {
        let wrapper;
        beforeEach(function() {
            wrapper = mount(story);
        });
        it('Should contain one div', function() {
            expect(wrapper.find('div').length).toBe(1);

        });
        it('Should "say hello" in german', function() {
            expect(wrapper.text()).toBe('Sag hallo');

        });
    }));
    return story;
})
;
