import React, { Component, PropTypes } from 'react';

export default class MuppetBox extends Component {
    clickHandler(event) {
        this.props.onChange(event.target.id);
    }

  render() {
    return (
      <div className="col s3">
            <a className="tilt" href="#">
                <img className={ this.props.isSelected ? "selected" : "notSelected" }
                    onClick={this.clickHandler.bind(this)}
                    src={this.props.imageFilePath}
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
  isSelected: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}
