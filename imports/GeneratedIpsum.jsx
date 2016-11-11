import React, { Component } from 'react';

export default class GeneratedIpsum {
  renderParagraphs() {
    return this.propTypes.paragraphs.map((paragraphText) => {
      <GeneratedParagraph text={paragraphText} />
    });
  }

  render() {
    return(
      <div>
        {this.renderParagraphs()}
      </div>
    );
  }
}

GeneratedIpsum.propTypes = {
  paragraphs: PropTypes.array.isRequired,
};
