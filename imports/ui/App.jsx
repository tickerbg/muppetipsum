import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// Our react components
import MuppetBox from './MuppetBox';
import ContentBox from './ContentBox';

// Mongo collections
import { Muppets } from '../api/muppets.js';

// Custom scripts
import { shuffle, validateMuppetTag } from '../scripts/functions.js';

// App component - represents the whole app
export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMuppet: "",
            loremipsum: "<h5>Nothing generated yet!</h5>",
        };
    }

    /**
    * Our props(the muppets in the DB) do not change, so this would only be called after the
    * async loading from the db is finished.
    */
    componentWillReceiveProps(nextProps) {
        if(nextProps.muppets != null) {
            $("body").attr('class', nextProps.muppets[0].tag);
            this.setState({selectedMuppet: nextProps.muppets[0].tag});
        }
    }

    handleMuppetChange(muppetId) {
        if(validateMuppetTag(muppetId)) {
        $("body").attr('class', muppetId);
            this.setState({
                selectedMuppet: muppetId,
            });
        } else {
            this.setState({
                selectedMuppet: muppets[0].tag,
            });
        }
        $('#ipsum-content').text('');
    }

    setData(data, paragraphCount) {
        var result = "";
        var $content = $('#ipsum-content');
        $content.empty();
        for (var i = 0; i < paragraphCount; i++) {
            result += "<h5>";
            var current = shuffle(data);
            for (var quote of data) {
                result += " " + quote;
            }
            result += '</h5>';
        }

        this.setState({
            loremipsum: result,
        });
    }

    generateIpsum(numberOfParagraphs) {
        const quotes = Muppets.findOne({tag: this.state.selectedMuppet}).quotes;

        this.setData(quotes, Number(numberOfParagraphs));
    }

    renderMuppets() {
        return this.props.muppets.map((muppet) => {
            var selected = this.state.selectedMuppet == muppet.tag;
            return (
                <MuppetBox
                    key={muppet._id}
                    imageFilePath={muppet.imageFilePath}
                    tag={muppet.tag}
                    onChange={this.handleMuppetChange.bind(this)}
                    isSelected={selected} />
            )
        });
    }

    render() {
        console.log("render");
        return (
            <div>
                <center className="row" id="select-box">
                    {this.renderMuppets()}
                </center>
                <ContentBox loremIpsumHtml={this.state.loremipsum}
                    parentHandleSubmit={this.generateIpsum.bind(this)} />
            </div>
        );
    }
// end of class
}

App.propTypes = {
  muppets: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        muppets: Muppets.find({}).fetch(),
    };
}, App);
