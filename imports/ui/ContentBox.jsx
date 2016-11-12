import React, { Component, PropTypes } from 'react';
import 'jquery';

export default class ContentBox extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        var selectedQuoteCount = $("#quoteCount").val();
        this.props.parentHandleSubmit(selectedQuoteCount);
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
                <div id="ipsum-content" dangerouslySetInnerHTML={{__html: this.props.loremIpsumHtml}}></div>
            </center>
        );
    }
}

ContentBox.propTypes = {
    loremIpsumHtml: PropTypes.string.isRequired,
    parentHandleSubmit: PropTypes.func.isRequired,
}
