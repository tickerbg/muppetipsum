import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js");

});
