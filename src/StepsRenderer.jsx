import React, { Component, PropTypes } from 'react';
import { logging, Utils } from '@jenkins-cd/blueocean-core-js';

const logger = logging.logger('react-flow.Renderer');
// , i18nTranslator, loadingIndicator
export class StepsRenderer extends Component {
    render() {
        const { steps = [], placeholders = [], activeIndex = 0 } = this.props;

        if  (steps.length===0 && placeholders.length===0) {
            logger.error('no Steps');
            return null;
        }

        // helper function to create a React element from a step.
        const createReactElement = step => React.createElement(step.stepElement, {
            ...step.props || {}, ...props, key: Utils.randomId(),
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
            className="creation-steps"
            activeIndex={activeIndex}>
            { allSteps }
        </MultiStepFlow>);
    }
}
StepsRenderer.propTypes = {
    steps: PropTypes.array,
    placeholders: PropTypes.array,
};

export default StepsRenderer;
