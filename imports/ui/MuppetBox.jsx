import React, { Component, PropTypes } from 'react';
import '../stylesheets/style.css';

export default class MuppetBox extends Component {
  render() {
    return (
      <div className="col s3">
            <a className="tilt" href="#">
                <img src={this.props.imageFilePath}
                    alt={this.props.tag}
                    id={this.props.tag} />
            </a>
        </div>
    );
  }
}

MuppetBox.propTypes = {
  imageFilePath: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
}
