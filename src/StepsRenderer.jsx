import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as logging from '@jenkins-cd/logging';
import { observer } from 'mobx-react';
import MultiStepFlow from './MultiStepFlow';
import randomId from './randomId';

const logger = logging.logger('react-flow.Renderer');

@observer
export class StepsRenderer extends Component {
    constructor(props) {
        super(props);
        this.flowManager = props.flowManager;
    }
    render() {
        const { steps = [], placeholders = [], activeIndex = 0 } = this.flowManager;
        logger.warn('steps', steps);

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
    flowManager: PropTypes.object.required,
};

export default StepsRenderer;
