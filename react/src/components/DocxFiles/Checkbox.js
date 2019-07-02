import React from "react";
import "./Checkbox.css";
const { Component } = React;
//https://codereview.stackexchange.com/questions/186393/simple-checkboxes-with-react
const btnDefaultStyle = {
  padding: '16px 32px',
  cursor: 'pointer',
  fontSize: 16,
  color: 'black',
  backgroundColor: 'DeepSkyBlue ',
  border: 'none',
  borderRadius: '40px',
  outline: 'none',
  width: 200,
};
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.sendToCrawler = this.sendToCrawler.bind(this);
  }
  sendToCrawler() {
      for (var key in this.props.itemsToDisplay) {
	if (this.props.itemsToDisplay[key] === true) {
	        const req = new XMLHttpRequest();
      		req.open("GET", "http://localhost:8001/crawler/crawling/"+key);
      		req.send();
		console.debug("Call crawler for " + key);
	}
      }
  }
  // handleClick was inlined

  render() {
    return (
      <div>
        <form>
          {Object.keys(this.props.itemsToDisplay).map((key) => (
            <div key={key}>
              <input
                name={key}
                id={`checkbox-${key}`}
                type="checkbox"
                checked={this.props.itemsToDisplay[key]}
                onChange={() => {this.props.flipCheck(key)}}
              />

              <span className="padding">
                {/* Don't need a `key` prop here */}
                <label htmlFor={`checkbox-${key}`}>
                  {key}
                </label>
              </span>
            </div>
          ))}
        </form>
	<button style={btnDefaultStyle} onClick={this.sendToCrawler}>Send selection</button>
      </div>
    );
  }
}
export default Checkbox;
