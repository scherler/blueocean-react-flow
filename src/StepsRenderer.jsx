import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as logging from '@jenkins-cd/logging';
import MultiStepFlow from './MultiStepFlow';
import randomId from './randomId';

const logger = logging.logger('react-flow.Renderer');

export class StepsRenderer extends Component {
    render() {
        const { steps = [], placeholders = [], activeIndex = 0 } = this.props;

        if  (steps.length===0 && placeholders.length===0) {
            logger.error('no Steps');
            return null;
        }

        // helper function to create a React element from a step.
        const createReactElement = step => React.createElement(step.stepElement, {
            ...step.props || {}, ...this.props, key: randomId(),
        });
        // create Step elements from the steps
        const flowSteps = steps.map(createReactElement);
        // create Step elements for each "placeholder" text and
        const placeholderSteps = placeholders.map(createReactElement);
        // then combine with the actual rendered steps
        const allSteps = [].concat(
            flowSteps,
            placeholderSteps,
        );
        return (<MultiStepFlow
            {...{
                className: 'creation-steps',
                activeIndex,
                ...this.props,
            }}
        >
            { allSteps }
        </MultiStepFlow>);
    }
}
StepsRenderer.propTypes = {
    activeIndex: PropTypes.number,
    steps: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    placeholders:  PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default StepsRenderer;
