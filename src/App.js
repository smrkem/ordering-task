import React, { Component } from 'react';
import './App.css';
import Survey from './Survey';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="container-drag">
        <Header />
        <Survey />
      </div>
    );
  }
}

export default App;
