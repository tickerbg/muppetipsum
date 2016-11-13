import React, { PropTypes, Component } from 'react';

import IpsumParagraph from './IpsumParagraph';

export default class GeneratedIpsum extends Component {
    renderParagraphs() {
        var i = 0;
        return this.props.paragraphs.map((paragraph) => (
            <IpsumParagraph key={i++}
                text={paragraph} />
        ));
    }

    render() {
        return (
            <div id="ipsum-content">
                {this.renderParagraphs()}
            </div>
        );
    }
}

GeneratedIpsum.propTypes = {
    paragraphs: PropTypes.array.isRequired,
}
