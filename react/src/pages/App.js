import React, { Component } from "react";

import Checkbox from '../components/DocxFiles/Checkbox'
import Upload from '../components/DocxFiles/Upload'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chkArr: {},
    };
    this.addItems = this.addItems.bind(this);
    this.flipCheck= this.flipCheck.bind(this);
  }
  addItems(new_labels) {
    console.debug(new_labels);
    var chkArr = {};
    for (var key in new_labels){
	var new_label = new_labels[key];
    	chkArr[new_label] = true;
    }
    console.debug(JSON.stringify(chkArr, null, 4));
    this.setState({
      chkArr: chkArr
    })
  }
  flipCheck(key) {
	const {chkArr} = this.state;
	chkArr[key] = !chkArr[key];
	this.setState(chkArr);
  }
  render() {
  return (
    <div style={divStyles}>
      <Upload addItems={this.addItems} />
      <Checkbox itemsToDisplay={this.state.chkArr} flipCheck={this.flipCheck} />
    </div>
  );
  }
};

const divStyles = {
    margin: "0 auto",
    maxWidth: 960,
};

export default App

