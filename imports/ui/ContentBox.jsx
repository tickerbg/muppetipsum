import React, { Component, PropTypes } from 'react';

// Our react components
import GeneratedIpsum from './GeneratedIpsum';

import {getNumberInputValueById} from '../scripts/functions.js';

export default class ContentBox extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        this.props.parentHandleSubmit(getNumberInputValueById("quoteCount"));
    }

    render() {
        // TODO: replace the dangerous inner html thing with a component for better safety
        return (
            <center id="content">
                <center className="row s12" id="select-box">
                    <h4 className="col s6">Enter how many paragraphs you want to generate:</h4>
                    <span className="input-field col s3">
                        <input type="number" defaultValue="5" id="quoteCount" />
                    </span>
                    <div className="col s3">
                        <a id= "submitButton" onClick={this.handleSubmit.bind(this)} className="waves-effect waves-light btn-large black">Go go goooo!</a>
                    </div>
                </center>
                <GeneratedIpsum paragraphs={this.props.loremIpsumHtml} />
            </center>
        );
    }
}

ContentBox.propTypes = {
    loremIpsumHtml: PropTypes.array.isRequired,
    parentHandleSubmit: PropTypes.func.isRequired,
}
