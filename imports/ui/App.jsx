import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MuppetBox from './MuppetBox.jsx';

import { Muppets } from '../api/muppets.js';

import '../scripts/3_script.js';

// App component - represents the whole app
export class App extends Component {

  renderMuppets() {
    return this.props.muppets.map((muppet) => (
        <MuppetBox
            key={muppet.tag}
            imageFilePath={muppet.imageFilePath}
            tag={muppet.tag} />
    ));
  }

  render() {
    console.log("there are " + this.props.muppets.length + " muppets in the db");
    return (
      <div>
        <center className="row" id="select-box">
          {this.renderMuppets()}
        </center>
        <center id="content">
          <h1>Choose your ipsum muppet!</h1>
        </center>
      </div>
    );
  }
}

App.propTypes = {
  muppets: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    muppets: Muppets.find({}).fetch(),
  };
}, App);
