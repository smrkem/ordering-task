import React, { Component } from 'react';
import './App.css';
import Survey from './Survey';

class App extends Component {
  render() {
    return (
      <div className="container-drag">
        <h2 className="header">SOCIAL ISSUES SURVEY</h2>
        <Survey />
      </div>
    );
  }
}

export default App;
