import React, { Component } from 'react'

export default class KeyIssue extends Component {
  render() {
    return (
      <div className="keyIssue" style={{borderColor: this.props.bgcolor}}>
        <h3 className="title">{this.props.name}</h3>
        <div className="issueIcon">icon</div>
        <p className="issueCopy">{this.props.copy}</p>
      </div>
    );
  }
}