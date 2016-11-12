import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// Our react components
import MuppetBox from './MuppetBox';
import ContentBox from './ContentBox';

// Mongo collections
import { Muppets } from '../api/muppets.js';

// Custom scripts
import { shuffle, validateMuppetTag,  setBodyClass, generateIpsumHtml } from '../scripts/functions.js';

// constants
const NO_IPSUM_GENERATED_HTML = "<h5>Nothing generated for this muppet yet!</h5>";

// App component - represents the whole app
export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMuppet: "",
            loremipsum: NO_IPSUM_GENERATED_HTML,
        };
    }

    /**
    * Our props(the muppets in the DB) do not change, so this would only be called after the
    * async loading from the db is finished.
    */
    componentWillReceiveProps(nextProps) {
        if(nextProps.muppets != null) {
            setBodyClass(nextProps.muppets[0].tag);
            this.setState({selectedMuppet: nextProps.muppets[0].tag});
        }
    }

    handleMuppetChange(muppetId) {
        if(validateMuppetTag(muppetId)) {
            setBodyClass(muppetId);
            this.setState({
                selectedMuppet: muppetId,
                loremipsum: NO_IPSUM_GENERATED_HTML,
            });
        } else {
            this.setState({
                selectedMuppet: muppets[0].tag,
                loremipsum: NO_IPSUM_GENERATED_HTML,
            });
        }
    }

    setData(data, paragraphCount) {
        const ipsumHtml = generateIpsumHtml(data, paragraphCount);
        this.setState({
            loremipsum: ipsumHtml,
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
