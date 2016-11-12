import { Muppets } from '../api/muppets.js';

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    let shuffled = array.slice(0, Math.floor(Math.random() * 3) + 7);
    return shuffled;
}

function validateMuppetTag(muppetTag) {
    return Muppets.find({tag: muppetTag}).count() > 0;
}

export { shuffle, validateMuppetTag };
