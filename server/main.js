import { Meteor } from 'meteor/meteor';
import { Muppets } from '../imports/api/muppets.js';

Meteor.startup(() => {
  if(Muppets.find().count() < 4) {
    Muppets.insert({"name": "elmo", "imageFilePath": "images/elmo.png"});
    Muppets.insert({"name": "bigBird", "imageFilePath":"images/big-bird.png"});
    Muppets.insert({"name": "kermit", "imageFilePath":"images/kermit.png"});
    Muppets.insert({"name": "oscar", "imageFilePath":"images/oscar.png"});
  }
});
