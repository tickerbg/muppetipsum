import {
  Meteor
}
from 'meteor/meteor';
import {  Muppets } from '../imports/api/muppets.js';

import fs from 'fs';
import cheerio from 'cheerio';
import express from 'express';
import request from 'request';
import {Cookies} from 'cookies';
//var cheerio = require('../node_modules/cheerio/lib/cheerio.js');
var elmo = {
  "name": "Elmo",
  "tag": "elmo",
  "imageFilePath": "images/elmo.png"
};

var bigBird = {
  "name": "Big Bird",
  "tag": "bigBird",
  "imageFilePath": "images/big-bird.png"
};

var kermit = {
  "name": "Kermit the Frog",
  "tag": "kermit",
  "imageFilePath": "images/kermit.png"
};

var oscar = {
  "name": "Oscar the Grouch",
  "tag": "oscar",
  "imageFilePath": "images/oscar.png"
};

function getImdbQuotes(callback) {
  //var cheerio = require('cheerio');
  //var app = express();

  var CHARACTERS = ['Elmo', 'Big Bird', 'Kermit the Frog', 'Oscar the Grouch'];
  var IMDB_URL = 'http://www.imdb.com/title/tt0063951/trivia?tab=qt'; //var IMDB_URL = 'http://www.imdb.com/title/tt0275667/trivia?tab=qt';
  var LOCAL_FILENAME = '/home/petkovmartin/proj/ipsum/server/muppets.json';

  var muppets = [];

  fs.readFile(LOCAL_FILENAME, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    muppets = JSON.parse(data);
    request(IMDB_URL, function(error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);
        var muppetQuote = "";
        $('.sodatext').each(function(index) {
          muppetQuote = $(this).text().replace(/ *\([^)]*\) */g, "").replace(
            /(\r\n|\n|\r)/gm, "").split(":");
          // get only the quotes for characters listed in CHARACTERS
          if (CHARACTERS.indexOf(muppetQuote[0].trim()) != -1) {
            muppets.push({
              character: muppetQuote[0].trim(),
              quote: muppetQuote[1].trim(),
            });
          }
        });
      }
      //console.log(muppets);
      callback(muppets);
      //return muppets;
    });
  });


}

Meteor.startup(() => {
    getImdbQuotes(function (muppets) {
    var quotes = {
      elmo: [],
      oscar: [],
      kermit: [],
      bigBird: []
    };
    for (var el of muppets) {
      switch (el.name) {
        case "Elmo":
          quotes.elmo.push(el.quote);
          break;
        case "Big Bird":
          quotes.bigBird.push(el.quote);
          break;
        case "Kermit the Frog":
          quotes.kermit.push(el.quote);
          break;
        case "Oscar the Grouch":
          quotes.oscar.push(el.quote);
          break;
        default:

      }
      elmo.quotes = quotes.elmo;
      bigBird.quotes = quotes.bigBird;
      kermit.quotes = quotes.kermit;
      oscar.quotes = quotes.oscar;
    }
  });


  if (Muppets.find().count() < 4) {
    Muppets.insert(elmo);
    Muppets.insert(bigBird);
    Muppets.insert(kermit);
    Muppets.insert(oscar);
  }

});
