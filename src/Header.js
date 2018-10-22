import React from 'react'
import './Header.css';

const Header = () => (
  <header className="App-header">
    <h1>SOCIAL ISSUES SURVEY</h1>
    <div className="header-links">
      <a href="http://heid-task-app.s3-website-us-east-1.amazonaws.com/">HEID task</a>
      <a href="#">Survey Prototype</a>
      <a href="http://ms-mid-task.s3-website-us-east-1.amazonaws.com/">Staircase Prototype</a>
    </div>
  </header>
)

export default Header

