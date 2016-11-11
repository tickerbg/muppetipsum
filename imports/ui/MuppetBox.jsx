import React, { Component, PropTypes } from 'react';
import '../stylesheets/style.css';

export default class MuppetBox extends Component {
  render() {
    return (
      <div className="col s3">
            <a className="tilt" href="#">
                <img src={this.props.imageFilePath}
                    alt={this.props.name}
                    id={this.props.name} />
            </a>
        </div>
    );
  }
}

MuppetBox.propTypes = {
  imageFilePath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
