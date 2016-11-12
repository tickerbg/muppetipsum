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

function setBodyClass(newClassName) {
    $("body").attr('class', newClassName);
}

function generateIpsumHtml(quotes, paragraphCount) {
    var result = "";
    for(var a = 1; a <= paragraphCount; a++) {
        result += generateIpsumParagraphHtml(quotes);
    }
    return result;
}

function generateIpsumParagraphHtml(quotes) {
    result = "<h5>";
    var current = shuffle(quotes);
    for (var quote of quotes) {
        result += " " + quote;
    }
    return (result += '</h5>');
}

function getNumberInputValueById(numberInputId) {
    const idSelector = "#" + numberInputId;
    console.log(idSelector);
    return $(idSelector).val();
}

export { shuffle, validateMuppetTag, setBodyClass, generateIpsumHtml, getNumberInputValueById };
