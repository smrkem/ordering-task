import React, { Component } from 'react'
import './App.css'

export default class Survey extends Component {
  state = {
    showing: false,
    issues: [
      {
        name: "Gun Control",
        category: "uncategorized",
        bgcolor: "lightblue",
        copy: "Gun Control copy placeholder..."
      },
      {name: "Animal Testing", copy: "Animal Testing copy placeholder...", category: "uncategorized", bgcolor: "yellow"},
      {name: "Marriage Equality", copy: "Marriage Equality copy placeholder...", category: "uncategorized", bgcolor: "lightgreen"},
      {name: "Abortion", copy: "Gun Control copy placeholder...", category: "uncategorized", bgcolor: "red"},
      {name: "Hijab / Burqa", copy: "Gun Control copy placeholder...", category: "uncategorized", bgcolor: "aqua"},
      {name: "Marijuana Legalisation", copy: "Gun Control copy placeholder...", category: "uncategorized", bgcolor: "orange"},
      {name: "Gender Inequality", copy: "Gun Control copy placeholder...", category: "uncategorized", bgcolor: "pink"}
    ]
  }

  onDragStart(e, id) {
    e.dataTransfer.setData("id", id);
    this.showIssue(id);
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e, cat) {
    let id = e.dataTransfer.getData("id");
    this.setState({showing: false});
    let issues = this.state.issues.map(issue => {
      if (issue.name == id) {
        issue.category = cat;
      }
      return issue;
    });

    this.setState({issues});
  }

  onClick(e, id) {
    this.showIssue(id);
  }

  showIssue(id) {
    let issue = this.state.issues.filter(issue => issue.name === id)[0];
    this.setState({showing: issue.name});
  }

  render() {
    var issues = {
      uncategorized: [],
      dontcare: [],
      carelittle: [],
      carelots: []
    }
    var detail = (<div></div>);

    this.state.issues.forEach((i) => {
      issues[i.category].push(
        <div key={i.name}
            draggable
            onClick={e => this.onClick(e, i.name)}
            onDragStart={e => this.onDragStart(e, i.name)}
            className="draggable"
            style= {{backgroundColor: i.bgcolor}}
        >
          {i.name}
        </div>
      )
      if (i.name === this.state.showing) {
        detail = (
          <div className="issueDetailView">
            <h3>{i.name}</h3>
            <p>{i.copy}</p>
          </div>
        )
      }
    })
    return (
      <div className="container-drag">
        <h2 className="header">SOCIAL ISSUES SURVEY</h2>
        <div className="issueDetailView">
          {detail}
        </div>
        <div className="uncategorized">
            <span className="task-header">ISSUES</span>
            {issues.uncategorized}
        </div>
        <div className="container-dontcare droppable"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "dontcare")}
        >
            <span className="task-header">DON'T CARE</span>
            {issues.dontcare}
        </div>
        <div className="container-carelittle droppable"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "carelittle")}
        >
            <span className="task-header">CARE A LITTLE</span>
            {issues.carelittle}
        </div>
        <div className="container-carelots droppable"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "carelots")}
        >
            <span className="task-header">CARE A LOT</span>
            {issues.carelots}
        </div>
      </div>
    )
  }
}