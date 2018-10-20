import React, { Component } from 'react'
import './App.css'

export default class Survey extends Component {
  state = {
    issues: [
      {name: "Gun Control", category: "uncategorized", bgcolor: "lightblue"},
      {name: "Animal Testing", category: "uncategorized", bgcolor: "yellow"},
      {name: "Marriage Equality", category: "uncategorized", bgcolor: "lightgreen"},
      {name: "Abortion", category: "uncategorized", bgcolor: "red"},
      {name: "Hijab / Burqa", category: "uncategorized", bgcolor: "aqua"},
      {name: "Marijuana Legalisation", category: "uncategorized", bgcolor: "orange"},
      {name: "Gender Inequality", category: "uncategorized", bgcolor: "pink"}
    ]
  }

  onDragStart(e, id) {
    e.dataTransfer.setData("id", id);
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e, cat) {
    let id = e.dataTransfer.getData("id");
    // console.log('drop: ', id);
    let issues = this.state.issues.map(issue => {
      if (issue.name == id) {
        issue.category = cat;
      }
      return issue;
    });

    this.setState({issues});
  }

  render() {
    var issues = {
      uncategorized: [],
      dontcare: [],
      carelittle: [],
      carelots: []
    }

    this.state.issues.forEach((i) => {
      issues[i.category].push(
        <div key={i.name}
            draggable
            onDragStart={e => this.onDragStart(e, i.name)}
            className="draggable"
            style= {{backgroundColor: i.bgcolor}}
        >
          {i.name}
        </div>
      )
    })
    return (
      <div className="container-drag">
        <h2 className="header">SOCIAL ISSUES SURVEY</h2>
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