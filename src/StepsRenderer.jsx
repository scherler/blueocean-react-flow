import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import * as logging from '@jenkins-cd/logging';
import MultiStepFlow from './MultiStepFlow';
import FlowStep from './FlowStep';

const logger = logging.logger('react-flow.Renderer');

@observer
export class StepsRenderer extends Component {
    render() {
        // create Step elements from the steps
        const steps = this.props.flowManager.steps.map(step => step.stepElement);
        // create Step elements for each "placeholder" text and
        const placeholderSteps = this.props.flowManager.placeholders.map(text => (
            <FlowStep title={text} />
        ));
        // then combine with the actual rendered steps
        const allSteps = [].concat(
            steps,
            placeholderSteps,
        );

        return (<MultiStepFlow
            className="creation-steps" activeIndex={this.props.flowManager.activeIndex}
        >
            {React.Children.map(allSteps, child => (
                    React.cloneElement(child, this.props)
                ))}
            </MultiStepFlow>);
    }
}
StepsRenderer.propTypes = {
    flowManager: PropTypes.func,
};

export default StepsRenderer;
