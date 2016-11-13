import React, { Component, PropTypes } from 'react';

export default class IpsumParagraph extends Component {
    render() {
        return (
            <h5><p>{this.props.text}</p></h5>
        );
    }
}

IpsumParagraph.propTypes = {
    text: PropTypes.string.isRequired,
}
